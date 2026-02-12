// src/hooks/api/useFirebase.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/hooks/api/)를 엄수합니다.
 * 2. Firebase SDK 초기화 및 공통 데이터 가공 로직을 관리합니다.
 * 3. 비동기 상태(Loading, Error)를 표준화하여 반환합니다.
 */

import { useState, useCallback } from 'react';
// import { db } from '../../main'; // 실제 환경에서는 main 혹은 firebase 설정 파일에서 가져옴

export const useFirebase = (collectionPath) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 데이터 생성 (Create)
   */
  const addData = useCallback(async (data) => {
    setLoading(true);
    try {
      // const docRef = await addDoc(collection(db, collectionPath), data);
      // return docRef.id;
      console.log(`[Firebase] Data added to ${collectionPath}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [collectionPath]);

  /**
   * 데이터 수정 (Update)
   */
  const updateData = useCallback(async (id, updateValues) => {
    setLoading(true);
    try {
      // const docRef = doc(db, collectionPath, id);
      // await updateDoc(docRef, updateValues);
      console.log(`[Firebase] Document ${id} updated`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [collectionPath]);

  /**
   * 데이터 삭제 (Delete)
   */
  const removeData = useCallback(async (id) => {
    setLoading(true);
    try {
      // await deleteDoc(doc(db, collectionPath, id));
      console.log(`[Firebase] Document ${id} deleted`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [collectionPath]);

  return {
    loading,
    error,
    addData,
    updateData,
    removeData
  };
};
