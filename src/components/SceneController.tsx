"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AURA_SCENES } from '@/lib/scenes';

declare global {
  interface Window {
    startScene: (id: string) => void;
    activeSceneId: string;
  }
}

export default function SceneController() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    window.startScene = (id: string) => {
      const scene = AURA_SCENES.find(s => s.id === id);
      if (!scene) {
        console.warn(`[SceneController] Unknown scene ID: ${id}`);
        return;
      }

      console.log(`🎬 [SceneController] Triggering scene: ${scene.name} (${id}) on route ${scene.route}`);
      window.activeSceneId = id;
      
      // Navigate if route differs
      if (scene.route !== pathname) {
        router.push(scene.route);
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('aura-scene-change', { detail: { id } }));
        }, 500);
      } else {
        window.dispatchEvent(new CustomEvent('aura-scene-change', { detail: { id } }));
      }
    };

    if (window.activeSceneId) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('aura-scene-change', { detail: { id: window.activeSceneId } }));
      }, 500);
    }

    return () => {};
  }, [router, pathname]);

  return null;
}
