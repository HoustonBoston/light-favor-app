import { Input } from "@chakra-ui/input"
import React from "react"

export default function InputTemplate ({ id, onChange, name, value, readOnly, placeholder }:
    {
        id?: string,
        onChange?: (e: React.ChangeEvent<HTMLInputElement>, index?: number) => void,
        name?: string,
        value?: number | undefined,
        readOnly?: boolean,
        placeholder?: string
    })
{
    return (
            <input
                onChange={onChange}
                required
                placeholder={placeholder}
                className="outline placeholder:text-center placeholder:text-black text-center"
                id={id}
                name={name}
                onClick={(e) => e.stopPropagation()}
                value={value ?? ''}
                readOnly={readOnly}
            />
    )
}
