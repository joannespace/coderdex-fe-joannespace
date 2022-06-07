import { Chip } from '@mui/material'
import React from 'react'
import { TYPE } from '../themeContext/MThemeProvider'


export const PokeType = ({ type }) => {
    return (
        <Chip
            sx={{
                borderRadius: 1, paddingX: 1, height: 20, fontSize: 12, width: "4.5rem",
                background: TYPE[type.toLowerCase()], color: TYPE[`${type.toLowerCase()}Text`]
            }}
            size='small'
            label={type}
        />
    )
}
