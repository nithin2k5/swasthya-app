import { BorderRadius, HealthColors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { MotiText, MotiView } from 'moti';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { diagnose, analyzeSymptoms, analyzeImage, ApiError, getStoredUser } from '@/lib/api';

const { width, height } = Dimensions.get('window');

interface Symptom {
  id: string;
  name: string;
  selected: boolean;
}

interface DiagnosisResult {
  condition: string;
  confidence: number;
  description: string;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
}

export default function DiagnosisScreen() {
  const { colors, isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState<'input' | 'analyzing' | 'results'>('input');
  const [symptoms, setSymptoms] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageAnalysisType, setImageAnalysisType] = useState<'skin' | 'xray' | 'general' | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([
    { id: '1', name: 'Headache', selected: false },
    { id: '2', name: 'Fever', selected: false },
    { id: '3', name: 'Fatigue', selected: false },
    { id: '4', name: 'Cough', selected: false },
    { id: '5', name: 'Nausea', selected: false },
    { id: '6', name: 'Dizziness', selected: false },
    { id: '7', name: 'Chest Pain', selected: false },
    { id: '8', name: 'Shortness of Breath', selected: false },
  ]);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.map(symptom =>
        symptom.id === id ? { ...symptom, selected: !symptom.selected } : symptom
      )
    );
  };

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload images.');
      return false;
    }
    return true;
  };

  const pickImageFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      setUploadedImage(manipulatedImage.uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      setUploadedImage(manipulatedImage.uri);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Upload Medical Image',
      'Choose how you want to add your medical image',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Gallery', onPress: pickImageFromGallery },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImageAnalysisType(null);
  };

  const startDiagnosis = async () => {
    const selectedCount = selectedSymptoms.filter(s => s.selected).length;
    const hasSymptoms = selectedCount > 0 || symptoms.trim();
    const hasImage = uploadedImage !== null;

    if (!hasSymptoms && !hasImage) {
      Alert.alert('No Input', 'Please select symptoms, describe your condition, or upload a medical image.');
      return;
    }

    setCurrentStep('analyzing');
    
    try {
      let result: DiagnosisResult;
      
      if (hasImage && imageAnalysisType && uploadedImage) {
        // Image-based analysis - call real API
        console.log('Analyzing image via API...');
        const imageResponse = await analyzeImage(uploadedImage, 'image/jpeg');
        
        // Map API response to our UI format
        const imageAnalysis = imageResponse.analysis;
        result = {
          condition: imageAnalysis.diagnosis || 'No specific condition identified',
          confidence: Math.round(imageAnalysis.confidence * 100),
          description: imageAnalysis.findings?.join('. ') || 'Image analysis completed.',
          recommendations: imageAnalysis.recommendations || [],
          severity: imageAnalysis.confidence > 0.7 ? 'low' : imageAnalysis.confidence > 0.4 ? 'medium' : 'high',
        };
      } else if (hasSymptoms) {
        // Symptom-based analysis - call real API
        const symptomList = selectedSymptoms
          .filter(s => s.selected)
          .map(s => s.name);
        
        if (symptomList.length === 0 && symptoms.trim()) {
          symptomList.push(symptoms.trim());
        }
        
        console.log('Analyzing symptoms via API:', symptomList);
        const user = await getStoredUser();
        const diagnosisResponse = await diagnose(symptomList, symptoms.trim());
        
        // Map API response to our UI format
        const topSuggestion = diagnosisResponse.diagnosis?.suggestions?.[0];
        if (topSuggestion) {
          result = {
            condition: topSuggestion.condition || 'Unknown condition',
            confidence: Math.round((topSuggestion.probability || 0) * 100),
            description: topSuggestion.description || diagnosisResponse.diagnosis?.analysis || 'Analysis completed.',
            recommendations: topSuggestion.recommendations || [],
            severity: topSuggestion.probability > 0.7 ? 'low' : topSuggestion.probability > 0.4 ? 'medium' : 'high',
          };
        } else {
          // Fallback if no suggestions
          result = {
            condition: 'No specific diagnosis',
            confidence: 0,
            description: 'Could not identify specific condition. Please consult with a healthcare professional.',
            recommendations: ['Schedule an appointment with a doctor', 'Provide more detailed symptom information'],
            severity: 'high',
          };
        }
      } else {
        throw new Error('No valid input provided');
      }
      
      setDiagnosisResult(result);
      setCurrentStep('results');
    } catch (error) {
      console.error('Diagnosis error:', error);
      Alert.alert(
        'Analysis Failed', 
        error instanceof ApiError 
          ? error.message 
          : 'Unable to complete analysis. Please try again or consult a healthcare professional.'
      );
      setCurrentStep('input');
    }
  };

  const resetDiagnosis = () => {
    setCurrentStep('input');
    setSymptoms('');
    setUploadedImage(null);
    setImageAnalysisType(null);
    setSelectedSymptoms(prev => prev.map(s => ({ ...s, selected: false })));
    setDiagnosisResult(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return HealthColors.good;
      case 'medium':
        return HealthColors.fair;
      case 'high':
        return HealthColors.poor;
      default:
        return HealthColors.fair;
    }
  };

  const renderInputStep = () => (
    <ScrollView style={styles.stepContainer} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 200,
        }}
        style={styles.stepHeader}
      >
        <View style={styles.stepIcon}>
          <Ionicons name="medical" size={32} color={colors.secondary} />
        </View>
        <Text style={[styles.stepTitle, { color: colors.text }]}>AI Health Diagnosis</Text>
        <Text style={[styles.stepSubtitle, { color: colors.textSecondary }]}>
          Describe your symptoms and get AI-powered health insights
        </Text>
      </MotiView>

      {/* Symptom Description */}
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 400,
        }}
        style={[styles.inputSection, { backgroundColor: colors.surface }]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Describe Your Symptoms
        </Text>
        <TextInput
          style={[styles.symptomInput, { 
            backgroundColor: colors.background,
            color: colors.text,
            borderColor: colors.border,
          }]}
          placeholder="Tell me how you're feeling..."
          placeholderTextColor={colors.textMuted}
          value={symptoms}
          onChangeText={setSymptoms}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </MotiView>

      {/* Image Upload Section */}
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 500,
        }}
        style={[styles.imageSection, { backgroundColor: colors.surface }]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Upload Medical Image
        </Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
          Upload X-rays, skin photos, or other medical images for AI analysis
        </Text>

        {!uploadedImage ? (
          <TouchableOpacity
            style={[styles.imageUploadButton, { borderColor: colors.border }]}
            onPress={showImagePickerOptions}
          >
            <LinearGradient
              colors={[`${colors.secondary}20`, `${colors.secondary}10`] as any}
              style={styles.imageUploadGradient}
            >
              <Ionicons name="camera" size={32} color={colors.secondary} />
              <Text style={[styles.imageUploadText, { color: colors.text }]}>
                Tap to Upload Image
              </Text>
              <Text style={[styles.imageUploadSubtext, { color: colors.textMuted }]}>
                Camera • Gallery
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={styles.imagePreviewContainer}>
            <View style={styles.imagePreview}>
              <Image source={{ uri: uploadedImage }} style={styles.previewImage} />
              <TouchableOpacity style={styles.removeImageButton} onPress={removeImage}>
                <Ionicons name="close-circle" size={24} color={colors.error} />
              </TouchableOpacity>
            </View>
            
            {/* Image Analysis Type Selector */}
            <View style={styles.analysisTypeContainer}>
              <Text style={[styles.analysisTypeLabel, { color: colors.text }]}>
                Image Type:
              </Text>
              <View style={styles.analysisTypeButtons}>
                {[
                  { id: 'skin', label: 'Skin', icon: 'body' },
                  { id: 'xray', label: 'X-Ray', icon: 'scan' },
                  { id: 'general', label: 'General', icon: 'medical' },
                ].map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.analysisTypeButton,
                      {
                        backgroundColor: imageAnalysisType === type.id 
                          ? colors.secondary 
                          : colors.background,
                        borderColor: imageAnalysisType === type.id 
                          ? colors.secondary 
                          : colors.border,
                      }
                    ]}
                    onPress={() => setImageAnalysisType(type.id as any)}
                  >
                    <Ionicons 
                      name={type.icon as any} 
                      size={16} 
                      color={imageAnalysisType === type.id ? '#fff' : colors.text} 
                    />
                    <Text
                      style={[
                        styles.analysisTypeButtonText,
                        {
                          color: imageAnalysisType === type.id ? '#fff' : colors.text,
                        }
                      ]}
                    >
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </MotiView>

      {/* Quick Symptoms */}
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 600,
        }}
        style={[styles.symptomsSection, { backgroundColor: colors.surface }]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Common Symptoms
        </Text>
        <View style={styles.symptomsGrid}>
          {selectedSymptoms.map((symptom, index) => (
            <MotiView
              key={symptom.id}
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 100,
                delay: 700 + index * 50,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.symptomChip,
                  {
                    backgroundColor: symptom.selected 
                      ? colors.secondary 
                      : colors.background,
                    borderColor: symptom.selected 
                      ? colors.secondary 
                      : colors.border,
                  }
                ]}
                onPress={() => toggleSymptom(symptom.id)}
              >
                <Text
                  style={[
                    styles.symptomChipText,
                    {
                      color: symptom.selected ? '#fff' : colors.text,
                    }
                  ]}
                >
                  {symptom.name}
                </Text>
              </TouchableOpacity>
            </MotiView>
          ))}
        </View>
      </MotiView>

      {/* Start Diagnosis Button */}
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 1000,
        }}
        style={styles.buttonContainer}
      >
        <TouchableOpacity style={styles.diagnoseButton} onPress={startDiagnosis}>
          <LinearGradient
            colors={colors.gradientPrimary as any}
            style={styles.diagnoseButtonGradient}
          >
            <Ionicons name="analytics" size={24} color="#fff" />
            <Text style={styles.diagnoseButtonText}>Start AI Analysis</Text>
          </LinearGradient>
        </TouchableOpacity>
      </MotiView>
    </ScrollView>
  );

  const renderAnalyzingStep = () => (
    <View style={styles.analyzingContainer}>
      {/* AI Brain Animation */}
      <MotiView
        from={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
        }}
        style={styles.brainContainer}
      >
        <MotiView
          from={{ scale: 0.8 }}
          animate={{ scale: 1.1 }}
          transition={{
            type: 'timing',
            duration: 2000,
            loop: true,
            repeatReverse: true,
          }}
          style={styles.brainIcon}
        >
          <LinearGradient
            colors={colors.gradientSecondary as any}
            style={styles.brainGradient}
          >
            <Ionicons name="analytics" size={80} color="#fff" />
          </LinearGradient>
        </MotiView>

        {/* Neural Network Animation */}
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{
              type: 'timing',
              duration: 1000,
              delay: index * 200,
              loop: true,
              repeatReverse: true,
            }}
            style={[
              styles.neuralNode,
              {
                top: 50 + Math.sin(index * 1.2) * 120,
                left: 50 + Math.cos(index * 1.2) * 120,
              },
            ]}
          />
        ))}

        {/* Scanning Lines */}
        <MotiView
          from={{ translateY: -200 }}
          animate={{ translateY: 200 }}
          transition={{
            type: 'timing',
            duration: 2000,
            loop: true,
          }}
          style={styles.scanLine}
        />
      </MotiView>

      {/* Analysis Text */}
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 500,
        }}
        style={styles.analyzingText}
      >
        <MotiText
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 1000,
            loop: true,
            repeatReverse: true,
          }}
          style={[styles.analyzingTitle, { color: colors.text }]}
        >
          {uploadedImage ? 'Analyzing Medical Image...' : 'Analyzing Your Symptoms...'}
        </MotiText>
        <Text style={[styles.analyzingSubtitle, { color: colors.textSecondary }]}>
          {uploadedImage 
            ? 'Our AI is processing your medical image using computer vision and deep learning'
            : 'Our AI is processing your health data using advanced machine learning algorithms'
          }
        </Text>
      </MotiView>

      {/* Image Preview During Analysis */}
      {uploadedImage && (
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 800,
          }}
          style={styles.analyzingImageContainer}
        >
          <View style={styles.analyzingImagePreview}>
            <Image source={{ uri: uploadedImage }} style={styles.analyzingImage} />
            
            {/* Scanning Overlay */}
            <MotiView
              from={{ translateY: -100 }}
              animate={{ translateY: 100 }}
              transition={{
                type: 'timing',
                duration: 2000,
                loop: true,
              }}
              style={styles.imageScanLine}
            />
            
            {/* Analysis Points */}
            {[0, 1, 2, 3].map((index) => (
              <MotiView
                key={index}
                from={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  delay: 1000 + index * 300,
                  loop: true,
                  repeatReverse: true,
                }}
                style={[
                  styles.analysisPoint,
                  {
                    top: 20 + Math.random() * 60,
                    left: 20 + Math.random() * 60,
                  },
                ]}
              />
            ))}
          </View>
          
          <Text style={[styles.imageAnalysisText, { color: colors.textSecondary }]}>
            Detecting patterns and anomalies...
          </Text>
        </MotiView>
      )}

      {/* Progress Indicators */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 800,
        }}
        style={styles.progressContainer}
      >
        {(uploadedImage 
          ? ['Image Processing', 'Computer Vision Analysis', 'Pattern Recognition', 'Diagnosis Generation']
          : ['Symptom Analysis', 'Pattern Recognition', 'Diagnosis Generation']
        ).map((step, index) => (
          <MotiView
            key={step}
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 100,
              delay: 1000 + index * 500,
            }}
            style={styles.progressStep}
          >
            <View style={[styles.progressIcon, { backgroundColor: colors.secondary }]}>
              <Ionicons name="checkmark" size={16} color="#fff" />
            </View>
            <Text style={[styles.progressText, { color: colors.text }]}>{step}</Text>
          </MotiView>
        ))}
      </MotiView>
    </View>
  );

  const renderResultsStep = () => (
    <ScrollView style={styles.stepContainer} showsVerticalScrollIndicator={false}>
      {/* Results Header */}
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 200,
        }}
        style={styles.resultsHeader}
      >
        <View style={[styles.resultIcon, { backgroundColor: getSeverityColor(diagnosisResult?.severity || 'low') }]}>
          <Ionicons name="medical" size={32} color="#fff" />
        </View>
        <Text style={[styles.resultTitle, { color: colors.text }]}>Diagnosis Complete</Text>
        <Text style={[styles.resultSubtitle, { color: colors.textSecondary }]}>
          AI Analysis Results
        </Text>
      </MotiView>

      {/* Diagnosis Result */}
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 400,
        }}
        style={[styles.diagnosisCard, { backgroundColor: colors.surface }]}
      >
        <View style={styles.diagnosisHeader}>
          <Text style={[styles.diagnosisCondition, { color: colors.text }]}>
            {diagnosisResult?.condition}
          </Text>
          <View style={styles.confidenceContainer}>
            <Text style={[styles.confidenceLabel, { color: colors.textSecondary }]}>
              Confidence
            </Text>
            <Text style={[styles.confidenceValue, { color: getSeverityColor(diagnosisResult?.severity || 'low') }]}>
              {diagnosisResult?.confidence}%
            </Text>
          </View>
        </View>
        
        <Text style={[styles.diagnosisDescription, { color: colors.textSecondary }]}>
          {diagnosisResult?.description}
        </Text>
      </MotiView>

      {/* Recommendations */}
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 600,
        }}
        style={[styles.recommendationsCard, { backgroundColor: colors.surface }]}
      >
        <Text style={[styles.recommendationsTitle, { color: colors.text }]}>
          Recommendations
        </Text>
        {diagnosisResult?.recommendations.map((recommendation, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 100,
              delay: 700 + index * 100,
            }}
            style={styles.recommendationItem}
          >
            <View style={[styles.recommendationIcon, { backgroundColor: colors.secondary }]}>
              <Ionicons name="checkmark" size={16} color="#fff" />
            </View>
            <Text style={[styles.recommendationText, { color: colors.textSecondary }]}>
              {recommendation}
            </Text>
          </MotiView>
        ))}
      </MotiView>

      {/* Action Buttons */}
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 1000,
        }}
        style={styles.actionButtons}
      >
        <TouchableOpacity style={styles.actionButton} onPress={resetDiagnosis}>
          <LinearGradient
            colors={colors.gradientSecondary as any}
            style={styles.actionButtonGradient}
          >
            <Ionicons name="refresh" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>New Diagnosis</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <View style={[styles.actionButtonOutline, { borderColor: colors.border }]}>
            <Ionicons name="share" size={20} color={colors.text} />
            <Text style={[styles.actionButtonOutlineText, { color: colors.text }]}>
              Share Results
            </Text>
          </View>
        </TouchableOpacity>
      </MotiView>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Header */}
      <LinearGradient
        colors={colors.gradientPrimary as any}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>AI Diagnosis</Text>
        <Text style={styles.headerSubtitle}>Advanced health analysis powered by AI</Text>
      </LinearGradient>

      {/* Content */}
      <View style={styles.content}>
        {currentStep === 'input' && renderInputStep()}
        {currentStep === 'analyzing' && renderAnalyzingStep()}
        {currentStep === 'results' && renderResultsStep()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: Typography.fontSize.base,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    flex: 1,
    paddingTop: 20,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  stepIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 180, 216, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: Typography.fontSize.base,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  inputSection: {
    borderRadius: BorderRadius.xl,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 16,
  },
  symptomInput: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: 16,
    fontSize: Typography.fontSize.base,
    minHeight: 100,
  },
  symptomsSection: {
    borderRadius: BorderRadius.xl,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  symptomChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 6,
    borderWidth: 1,
  },
  symptomChipText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  diagnoseButton: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  diagnoseButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  diagnoseButtonText: {
    color: '#fff',
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginLeft: 8,
  },
  analyzingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  brainContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 40,
  },
  brainIcon: {
    borderRadius: 80,
    overflow: 'hidden',
  },
  brainGradient: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  neuralNode: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00B4D8',
  },
  scanLine: {
    position: 'absolute',
    width: 200,
    height: 2,
    backgroundColor: 'rgba(0, 180, 216, 0.6)',
    left: 50,
  },
  analyzingText: {
    alignItems: 'center',
    marginBottom: 40,
  },
  analyzingTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: 8,
  },
  analyzingSubtitle: {
    fontSize: Typography.fontSize.base,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  progressContainer: {
    alignItems: 'flex-start',
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  progressText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  resultsHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  resultIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: 8,
  },
  resultSubtitle: {
    fontSize: Typography.fontSize.base,
    textAlign: 'center',
  },
  diagnosisCard: {
    borderRadius: BorderRadius.xl,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  diagnosisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  diagnosisCondition: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    flex: 1,
  },
  confidenceContainer: {
    alignItems: 'flex-end',
  },
  confidenceLabel: {
    fontSize: Typography.fontSize.sm,
    marginBottom: 4,
  },
  confidenceValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  diagnosisDescription: {
    fontSize: Typography.fontSize.base,
    lineHeight: Typography.lineHeight.base,
  },
  recommendationsCard: {
    borderRadius: BorderRadius.xl,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recommendationsTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recommendationIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  recommendationText: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    lineHeight: Typography.lineHeight.base,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 40,
    marginHorizontal: -8,
  },
  actionButton: {
    flex: 1,
    margin: 8,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: 8,
  },
  actionButtonOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
  },
  actionButtonOutlineText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: 8,
  },
  
  // Image Upload Styles
  imageSection: {
    borderRadius: BorderRadius.xl,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionSubtitle: {
    fontSize: Typography.fontSize.sm,
    marginBottom: 16,
    lineHeight: Typography.lineHeight.sm,
  },
  imageUploadButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  imageUploadGradient: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  imageUploadText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    marginTop: 12,
    marginBottom: 4,
  },
  imageUploadSubtext: {
    fontSize: Typography.fontSize.sm,
  },
  imagePreviewContainer: {
    alignItems: 'center',
  },
  imagePreview: {
    position: 'relative',
    marginBottom: 16,
  },
  previewImage: {
    width: 200,
    height: 150,
    borderRadius: BorderRadius.lg,
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  analysisTypeContainer: {
    width: '100%',
  },
  analysisTypeLabel: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: 12,
  },
  analysisTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  analysisTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    margin: 6,
  },
  analysisTypeButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    marginLeft: 6,
  },
  
  // Image Analysis Styles
  analyzingImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  analyzingImagePreview: {
    position: 'relative',
    width: 200,
    height: 150,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: 12,
  },
  analyzingImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageScanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(0, 180, 216, 0.8)',
    shadowColor: '#00B4D8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  analysisPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00B4D8',
    shadowColor: '#00B4D8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  imageAnalysisText: {
    fontSize: Typography.fontSize.sm,
    fontStyle: 'italic',
  },
});
