/**
 * Firebase Debug Utilities
 * Kiểm tra xem Firestore có được cấu hình đúng không
 */

export function checkFirestoreStatus() {
  console.log('🔍 Checking Firebase configuration...');
  
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  
  console.log('📝 Environment variables:');
  console.log('  - API Key:', apiKey ? apiKey.substring(0, 10) + '...' : '❌ NOT SET');
  console.log('  - Project ID:', projectId || '❌ NOT SET');
  
  // Check if using demo/fallback values
  const isUsingDemoConfig = 
    apiKey === 'demo-key' || 
    projectId === 'travel-app' ||
    !apiKey ||
    !projectId;
    
  if (isUsingDemoConfig) {
    console.warn('⚠️ WARNING: Using fallback/demo Firebase config!');
    console.warn('   → App will use localStorage instead of Firestore');
    console.warn('   → Data will NOT sync between devices');
    console.warn('   → Need to set up environment variables on Vercel!');
    return {
      isConfigured: false,
      usingFirestore: false,
      reason: 'Environment variables not set properly'
    };
  }
  
  console.log('✅ Firebase configured correctly');
  console.log('   → Using Firestore for data storage');
  console.log('   → Data will sync between all devices');
  
  return {
    isConfigured: true,
    usingFirestore: true,
    reason: 'Firebase configured'
  };
}

/**
 * Check current storage being used
 */
export function checkCurrentStorage() {
  try {
    // Check localStorage
    const localStorageData = localStorage.getItem('travel_tours_data');
    const hasLocalStorage = localStorageData !== null;
    
    console.log('💾 Current storage status:');
    console.log('  - localStorage:', hasLocalStorage ? `✅ Has data (${JSON.parse(localStorageData || '[]').length} tours)` : '❌ Empty');
    
    return {
      hasLocalStorage,
      localStorageCount: hasLocalStorage ? JSON.parse(localStorageData || '[]').length : 0
    };
  } catch (error) {
    console.error('❌ Error checking storage:', error);
    return {
      hasLocalStorage: false,
      localStorageCount: 0
    };
  }
}

/**
 * Full diagnostic check
 */
export function runDiagnostic() {
  console.log('================================');
  console.log('🔬 Firebase Diagnostic Check');
  console.log('================================');
  
  const firestoreStatus = checkFirestoreStatus();
  const storageStatus = checkCurrentStorage();
  
  console.log('================================');
  console.log('📊 Summary:');
  console.log('  Firestore configured:', firestoreStatus.isConfigured ? '✅ Yes' : '❌ No');
  console.log('  Using Firestore:', firestoreStatus.usingFirestore ? '✅ Yes' : '❌ No (using localStorage)');
  console.log('  LocalStorage has data:', storageStatus.hasLocalStorage ? '✅ Yes' : '❌ No');
  console.log('================================');
  
  if (!firestoreStatus.isConfigured) {
    console.log('');
    console.log('🔧 Fix:');
    console.log('1. Go to Vercel Dashboard > Settings > Environment Variables');
    console.log('2. Add all Firebase environment variables');
    console.log('3. Redeploy the project');
    console.log('');
  }
  
  return {
    firestoreStatus,
    storageStatus
  };
}

