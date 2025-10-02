import { useState } from 'react';

export const useCampo = (type) => {
    const [value, setValue] = useState('')

    const onChange = e => {
        setValue(e.target.value)
    }
    const limpiar = () => {
        setValue('')
    }

    return {
        value,
        inputProps: {
            type,
            value,
            onChange
        },
        limpiar
    }
}