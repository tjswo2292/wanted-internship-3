import React, { createContext, useState } from 'react'

type ColorType = string

type ColorContextType = {
  colorArray: ColorType[]
  updateColorArray: (data: string[]) => void
}

type ColorProviderProps = {
  children: React.ReactNode
}

export const ColorContext = createContext<ColorContextType>({ colorArray: [], updateColorArray: () => {} })

const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [colorArray, setColorArray] = useState<ColorType[]>([])

  const updateColorArray = (data: string[]) => {
    setColorArray(data)
  }

  return <ColorContext.Provider value={{ colorArray, updateColorArray }}>{children}</ColorContext.Provider>
}

export default ColorProvider
