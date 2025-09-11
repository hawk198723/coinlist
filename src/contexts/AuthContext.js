import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [isFirebaseConfigured] = useState(!!auth);

  // 注册新用户
  const signup = async (email, password, displayName) => {
    if (!auth) {
      toast.error('Authentication service not available. Please configure Firebase.');
      throw new Error('Firebase not configured');
    }
    
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // 更新用户显示名称
      await updateProfile(user, { displayName });
      
      // 在Firestore中创建用户文档
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        createdAt: new Date().toISOString(),
        watchlist: [],
        priceAlerts: [],
        preferences: {
          theme: 'light',
          notifications: true,
          emailAlerts: false
        }
      });

      // 发送邮箱验证
      await sendEmailVerification(user);
      toast.success('Account created! Please check your email to verify your account.');
      
      return user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  // 用户登录
  const login = async (email, password) => {
    if (!auth) {
      toast.error('Authentication service not available. Please configure Firebase.');
      throw new Error('Firebase not configured');
    }
    
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Welcome back, ${user.displayName || user.email}!`);
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // 用户登出
  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
      toast.info('You have been logged out.');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // 重置密码
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent! Check your inbox.');
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  // 获取用户资料
  const getUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Get user profile error:', error);
      return null;
    }
  };

  // 更新用户资料
  const updateUserProfile = async (uid, data) => {
    try {
      await setDoc(doc(db, 'users', uid), data, { merge: true });
      setUserProfile(prev => ({ ...prev, ...data }));
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  // 监听认证状态变化
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // 获取用户资料
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    resetPassword,
    getUserProfile,
    updateUserProfile,
    loading,
    isFirebaseConfigured
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
