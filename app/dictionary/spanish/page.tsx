"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Volume2 } from "lucide-react"

interface DictionaryEntry {
  spanish: string
  english: string
  pronunciation: string
  type: string
  example: string
}

const spanishDictionary: DictionaryEntry[] = [
  { spanish: "hola", english: "hello", pronunciation: "OH-lah", type: "interjection", example: "¡Hola! ¿Cómo estás?" },
  {
    spanish: "adiós",
    english: "goodbye",
    pronunciation: "ah-DYOHS",
    type: "interjection",
    example: "¡Adiós! Hasta mañana.",
  },
  {
    spanish: "gracias",
    english: "thank you",
    pronunciation: "GRAH-thyahs",
    type: "interjection",
    example: "Gracias por tu ayuda.",
  },
  {
    spanish: "por favor",
    english: "please",
    pronunciation: "por fah-VOR",
    type: "phrase",
    example: "¿Puedes ayudarme, por favor?",
  },
  { spanish: "agua", english: "water", pronunciation: "AH-gwah", type: "noun", example: "Necesito un vaso de agua." },
  { spanish: "casa", english: "house", pronunciation: "KAH-sah", type: "noun", example: "Mi casa es muy grande." },
  { spanish: "comer", english: "to eat", pronunciation: "ko-MER", type: "verb", example: "Me gusta comer pizza." },
  {
    spanish: "libro",
    english: "book",
    pronunciation: "LEE-bro",
    type: "noun",
    example: "Estoy leyendo un libro interesante.",
  },
  {
    spanish: "escuela",
    english: "school",
    pronunciation: "es-KWEH-lah",
    type: "noun",
    example: "Los niños van a la escuela.",
  },
  {
    spanish: "familia",
    english: "family",
    pronunciation: "fah-MEE-lyah",
    type: "noun",
    example: "Mi familia es muy importante para mí.",
  },
]

export default function SpanishDictionary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredEntries, setFilteredEntries] = useState(spanishDictionary)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term === "") {
      setFilteredEntries(spanishDictionary)
    } else {
      const filtered = spanishDictionary.filter(
        (entry) =>
          entry.spanish.toLowerCase().includes(term.toLowerCase()) ||
          entry.english.toLowerCase().includes(term.toLowerCase()),
      )
      setFilteredEntries(filtered)
    }
  }

  const playPronunciation = (word: string) => {
    // Simulate pronunciation playback
    console.log(`Playing pronunciation for: ${word}`)
    // In a real app, you would use Web Speech API or audio files
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-2xl mr-2">🇪🇸</span>
            Spanish Dictionary
          </h1>
          <p className="text-lg text-gray-600">Discover Spanish words and their English translations</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search Spanish or English words..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 text-lg py-3"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {filteredEntries.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No words found matching your search.</p>
              </CardContent>
            </Card>
          ) : (
            filteredEntries.map((entry, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-blue-600">{entry.spanish}</CardTitle>
                      <CardDescription className="text-lg">{entry.english}</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => playPronunciation(entry.spanish)}
                      className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold text-gray-700">Pronunciation: </span>
                      <span className="text-gray-600">{entry.pronunciation}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Type: </span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-sm">{entry.type}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Example: </span>
                      <span className="text-gray-600 italic">{entry.example}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
