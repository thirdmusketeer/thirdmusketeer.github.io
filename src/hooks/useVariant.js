import { useMemo } from 'react'
import { variants } from '../config/variants'
import { meta } from '../data/meta'

export function useVariant() {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    const name = params.get('variant') || 'default'
    const variant = variants[name] || variants.default
    return {
      ...variant,
      // Merge overrides into meta
      meta: { ...meta, ...variant.overrides },
    }
  }, [])
}
