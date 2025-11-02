import { BorderRadius, HealthColors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'diagnosis' | 'emergency';
}

interface QuickAction {
  id: string;
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
  category: 'symptoms' | 'general' | 'emergency';
  color?: string;
}

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const quickActions: QuickAction[] = [
  { id: '1', text: 'I have a headache', icon: 'medical-outline', category: 'symptoms' },
  { id: '2', text: 'Check my symptoms', icon: 'search-outline', category: 'symptoms' },
  { id: '3', text: 'Medication reminder', icon: 'alarm-outline', category: 'general' },
  { id: '4', text: 'Health tips', icon: 'bulb-outline', category: 'general' },
  { id: '5', text: 'Emergency help', icon: 'warning-outline', category: 'emergency' },
  { id: '6', text: 'Find nearby hospital', icon: 'location-outline', category: 'emergency' },
];

export default function ChatScreen() {
  const { colors, isDark } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Health Assistant powered by advanced machine learning. I can help you with symptoms analysis, health questions, medication reminders, and provide medical guidance. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setShowQuickActions(false);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(text),
        isUser: false,
        timestamp: new Date(),
        type: getResponseType(text)
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const generateAIResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('emergency') || lowerText.includes('urgent') || lowerText.includes('help')) {
      return "🚨 This seems urgent. If you're experiencing a medical emergency, please call emergency services immediately (911). For non-emergency urgent care, I can help you find the nearest medical facility. Would you like me to locate nearby hospitals or urgent care centers?";
    } else if (lowerText.includes('headache')) {
      return "I understand you're experiencing a headache. Let me help you assess this:\n\n• Is it a dull ache or sharp pain?\n• How long have you had it?\n• Any nausea or sensitivity to light?\n• Have you taken any medication?\n\nBased on your answers, I can provide personalized recommendations and determine if you should see a healthcare provider.";
    } else if (lowerText.includes('fever')) {
      return "A fever indicates your body is fighting something. Here's what I need to know:\n\n• What's your current temperature?\n• How long have you had the fever?\n• Any other symptoms (chills, body aches, fatigue)?\n• Are you taking any medications?\n\nThis information will help me provide appropriate guidance.";
    } else if (lowerText.includes('medication') || lowerText.includes('medicine')) {
      return "I can help with medication information and reminders. Please note that I provide general information only - always consult your healthcare provider for medical advice.\n\n• What medication are you asking about?\n• Do you need help setting up reminders?\n• Questions about interactions or side effects?\n\nWhat specific medication assistance do you need?";
    } else if (lowerText.includes('symptoms')) {
      return "I'm here to help analyze your symptoms using AI-powered assessment. Please describe:\n\n• What symptoms are you experiencing?\n• When did they start?\n• How severe are they (1-10 scale)?\n• Any triggers you've noticed?\n\nThe more details you provide, the better I can assist you with recommendations.";
    } else if (lowerText.includes('hospital') || lowerText.includes('doctor')) {
      return "I can help you find healthcare providers in your area. Based on your location and needs:\n\n• Nearby hospitals and urgent care\n• Specialist doctors\n• Pharmacy locations\n• Telemedicine options\n\nWhat type of healthcare facility are you looking for?";
    } else {
      return "Thank you for sharing that information. I'm analyzing your input using advanced health AI algorithms. Based on what you've told me, I recommend:\n\n• Monitor your symptoms closely\n• Stay hydrated and get adequate rest\n• Consider consulting a healthcare provider if symptoms persist\n\nIs there anything specific you'd like me to help you with regarding your health?";
    }
  };

  const getResponseType = (userText: string): 'text' | 'diagnosis' | 'emergency' => {
    const lowerText = userText.toLowerCase();
    if (lowerText.includes('emergency') || lowerText.includes('urgent')) {
      return 'emergency';
    } else if (lowerText.includes('symptom') || lowerText.includes('pain') || lowerText.includes('fever')) {
      return 'diagnosis';
    }
    return 'text';
  };

  const handleQuickAction = (action: QuickAction) => {
    if (action.category === 'emergency') {
      Alert.alert(
        'Emergency Action',
        'This will help you with emergency medical assistance. Continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Continue', onPress: () => sendMessage(action.text) }
        ]
      );
    } else {
      sendMessage(action.text);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMessageBubbleStyle = (type?: string) => {
    switch (type) {
      case 'emergency':
        return { backgroundColor: HealthColors.error, borderColor: HealthColors.error };
      case 'diagnosis':
        return { backgroundColor: colors.primary, borderColor: colors.primary };
      default:
        return { backgroundColor: colors.surface, borderColor: colors.border };
    }
  };

  const getQuickActionColor = (category: string) => {
    switch (category) {
      case 'emergency':
        return HealthColors.error;
      case 'symptoms':
        return colors.accent;
      default:
        return colors.primary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Header */}
      <LinearGradient
        colors={colors.gradientPrimary as any}
        style={styles.header}
      >
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
            delay: 200,
          }}
          style={styles.headerContent}
        >
          <View style={styles.aiAvatar}>
            <Ionicons name="medical" size={28} color="#fff" />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>AI Health Assistant</Text>
            <View style={styles.statusIndicator}>
              <MotiView
                from={{ scale: 0.8 }}
                animate={{ scale: 1.2 }}
                transition={{
                  type: 'timing',
                  duration: 1000,
                  loop: true,
                  repeatReverse: true,
                }}
                style={styles.onlineDot}
              />
              <Text style={styles.statusText}>Online • Secure</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="information-circle-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </MotiView>
      </LinearGradient>

      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {/* Quick Actions */}
          {showQuickActions && (
            <MotiView
              from={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 100,
                delay: 400,
              }}
              style={styles.quickActionsContainer}
            >
              <Text style={[styles.quickActionsTitle, { color: colors.text, fontFamily: Typography.fontFamily.bold }]}>Quick Actions</Text>
              <View style={styles.quickActionsGrid}>
                {quickActions.map((action, index) => (
                  <MotiView
                    key={action.id}
                    from={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: 'spring',
                      damping: 20,
                      stiffness: 100,
                      delay: 600 + index * 100,
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.quickActionButton,
                        { 
                          backgroundColor: action.category === 'emergency' 
                            ? `${HealthColors.error}15` 
                            : colors.surface,
                          borderColor: action.category === 'emergency' 
                            ? HealthColors.error 
                            : colors.border
                        }
                      ]}
                      onPress={() => handleQuickAction(action)}
                    >
                      <View style={[
                        styles.quickActionIcon,
                        { backgroundColor: `${getQuickActionColor(action.category)}20` }
                      ]}>
                        <Ionicons 
                          name={action.icon} 
                          size={22} 
                          color={getQuickActionColor(action.category)} 
                        />
                      </View>
                      <Text style={[
                        styles.quickActionText, 
                        { 
                          color: action.category === 'emergency' 
                            ? HealthColors.error 
                            : colors.text,
                          fontFamily: Typography.fontFamily.medium
                        }
                      ]}>
                        {action.text}
                      </Text>
                    </TouchableOpacity>
                  </MotiView>
                ))}
              </View>
            </MotiView>
          )}

          {/* Messages */}
          {messages.map((message, index) => (
            <MotiView
              key={message.id}
              from={{ opacity: 0, translateY: 20, scale: 0.9 }}
              animate={{ opacity: 1, translateY: 0, scale: 1 }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 100,
                delay: index * 50,
              }}
              style={[
                styles.messageContainer,
                message.isUser ? styles.userMessageContainer : styles.aiMessageContainer
              ]}
            >
              {!message.isUser && (
                <View style={[styles.aiMessageAvatar, { backgroundColor: colors.primary }]}>
                  <Ionicons name="medical" size={18} color="#fff" />
                </View>
              )}
              
              <View
                style={[
                  styles.messageBubble,
                  message.isUser 
                    ? { backgroundColor: colors.primary }
                    : getMessageBubbleStyle(message.type),
                  message.type === 'emergency' && styles.emergencyBubble
                ]}
              >
                {message.type === 'diagnosis' && !message.isUser && (
                  <View style={styles.diagnosisHeader}>
                    <Ionicons name="analytics" size={18} color="#fff" />
                    <Text style={styles.diagnosisLabel}>AI Health Analysis</Text>
                  </View>
                )}

                {message.type === 'emergency' && !message.isUser && (
                  <View style={styles.emergencyHeader}>
                    <Ionicons name="warning" size={18} color="#fff" />
                    <Text style={styles.emergencyLabel}>Emergency Assistance</Text>
                  </View>
                )}
                
                <Text
                  style={[
                    styles.messageText,
                    { 
                      color: message.isUser || message.type === 'diagnosis' || message.type === 'emergency' 
                        ? '#fff' 
                        : colors.text,
                      fontFamily: Typography.fontFamily.regular
                    }
                  ]}
                >
                  {message.text}
                </Text>
                
                <Text
                  style={[
                    styles.messageTime,
                    { 
                      color: message.isUser || message.type === 'diagnosis' || message.type === 'emergency' 
                        ? 'rgba(255, 255, 255, 0.7)' 
                        : colors.textMuted,
                      fontFamily: Typography.fontFamily.regular
                    }
                  ]}
                >
                  {formatTime(message.timestamp)}
                </Text>
              </View>
            </MotiView>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <MotiView
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 100,
              }}
              style={styles.typingContainer}
            >
              <View style={[styles.aiMessageAvatar, { backgroundColor: colors.primary }]}>
                <Ionicons name="medical" size={18} color="#fff" />
              </View>
              <View style={[styles.typingBubble, { backgroundColor: colors.surface }]}>
                <View style={styles.typingDots}>
                  {[0, 1, 2].map((index) => (
                    <MotiView
                      key={index}
                      from={{ opacity: 0.3, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.2 }}
                      transition={{
                        type: 'timing',
                        duration: 600,
                        loop: true,
                        repeatReverse: true,
                        delay: index * 200,
                      }}
                      style={[styles.typingDot, { backgroundColor: colors.textMuted }]}
                    />
                  ))}
                </View>
              </View>
            </MotiView>
          )}
        </ScrollView>

        {/* Input Area */}
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
            delay: 800,
          }}
          style={[styles.inputContainer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}
        >
          <View style={[styles.inputWrapper, { backgroundColor: colors.background }]}>
            <TextInput
              style={[styles.textInput, { color: colors.text, fontFamily: Typography.fontFamily.regular }]}
              placeholder="Ask about your health..."
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
              placeholderTextColor={colors.textMuted}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                { backgroundColor: inputText.trim() ? colors.primary : colors.border }
              ]}
              onPress={() => sendMessage(inputText)}
              disabled={!inputText.trim()}
            >
              <Ionicons 
                name="send" 
                size={22} 
                color={inputText.trim() ? "#fff" : colors.textMuted} 
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputActions}>
            <TouchableOpacity style={styles.inputAction}>
              <View style={[styles.inputActionIcon, { backgroundColor: `${colors.primary}15` }]}>
                <Ionicons name="camera-outline" size={20} color={colors.primary} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputAction}>
              <View style={[styles.inputActionIcon, { backgroundColor: `${colors.accent}15` }]}>
                <Ionicons name="mic-outline" size={20} color={colors.accent} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputAction}>
              <View style={[styles.inputActionIcon, { backgroundColor: `${colors.success}15` }]}>
                <Ionicons name="attach-outline" size={20} color={colors.success} />
              </View>
            </TouchableOpacity>
          </View>
        </MotiView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: isTablet ? 70 : 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 4,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
    marginRight: 8,
  },
  statusText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
  },
  headerButton: {
    padding: 8,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  quickActionsContainer: {
    marginBottom: 32,
  },
  quickActionsTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: -8,
  },
  quickActionButton: {
    borderRadius: BorderRadius.xl,
    padding: 16,
    margin: 8,
    width: (width - 80) / 2,
    alignItems: 'center',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    textAlign: 'center',
    lineHeight: 18,
  },
  messageContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  aiMessageContainer: {
    justifyContent: 'flex-start',
  },
  aiMessageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  messageBubble: {
    maxWidth: width * 0.75,
    borderRadius: BorderRadius['2xl'],
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emergencyBubble: {
    borderWidth: 2,
    borderColor: HealthColors.error,
  },
  diagnosisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  diagnosisLabel: {
    color: '#fff',
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginLeft: 8,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emergencyLabel: {
    color: '#fff',
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginLeft: 8,
  },
  messageText: {
    fontSize: Typography.fontSize.base,
    lineHeight: Typography.lineHeight.base,
  },
  messageTime: {
    fontSize: Typography.fontSize.xs,
    marginTop: 6,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  typingBubble: {
    borderRadius: BorderRadius['2xl'],
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: BorderRadius['2xl'],
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1.5,
    marginBottom: 12,
  },
  textInput: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    maxHeight: 120,
    paddingVertical: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputAction: {
    marginHorizontal: 8,
  },
  inputActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});