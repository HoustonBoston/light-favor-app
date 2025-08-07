import { Input } from "@chakra-ui/react"
import React from "react"

export default function InputTemplate ({ id, onChange, name }:
    {
        id?: string,
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
        name?: string
    })
{
    return (
        <Input
            onChange={onChange}
            required
            placeholder="Enter Text"
            className="placeholder:text-center"
            id={id}
            name={name}
        />
    )
}
