import { Field, Input } from "@chakra-ui/input"
import React from "react"

export default function InputTemplate ({ id, onChange, name, label }:
    {
        id?: string,
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
        name?: string,
        label: string
    })
{
    return (
            <Input
                display="inherit"
                onChange={onChange}
                required
                placeholder="Enter Text"
                className="placeholder:text-center"
                variant="subtle"
                id={id}
                name={name}
            />
    )
}
