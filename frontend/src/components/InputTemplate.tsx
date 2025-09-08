import { Input } from "@chakra-ui/input"
import React from "react"

export default function InputTemplate ({ id, onChange, name, value, readOnly, placeholder }:
    {
        id?: string,
        onChange?: (e: React.ChangeEvent<HTMLInputElement>, index?: number) => void,
        name?: string,
        value?: string | number,
        readOnly?: boolean,
        placeholder?: string
    })
{
    return (
            <Input
                display="inherit"
                onChange={onChange}
                required
                placeholder={placeholder}
                className="placeholder:text-center placeholder:text-black text-center"
                variant="subtle"
                id={id}
                name={name}
                onClick={(e) => e.stopPropagation()}
                value={value}
                readOnly={readOnly}
            />
    )
}
