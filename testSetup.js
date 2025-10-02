import { afterEach } from 'vitest' // Hook para reset antes de cada prueba
import { cleanup } from '@testing-library/react' // desmontar (unmount) cualquier componente que se haya renderizado durante una prueba.
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup()
})