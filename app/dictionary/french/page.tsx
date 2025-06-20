"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Volume2 } from "lucide-react"

interface DictionaryEntry {
  french: string
  english: string
  pronunciation: string
  type: string
  example: string
}

const frenchDictionary: DictionaryEntry[] = [
  {
    french: "bonjour",
    english: "hello/good morning",
    pronunciation: "bon-ZHOOR",
    type: "interjection",
    example: "Bonjour! Comment allez-vous?",
  },
  {
    french: "au revoir",
    english: "goodbye",
    pronunciation: "oh ruh-VWAHR",
    type: "interjection",
    example: "Au revoir! À bientôt!",
  },
  {
    french: "merci",
    english: "thank you",
    pronunciation: "mer-SEE",
    type: "interjection",
    example: "Merci beaucoup pour votre aide.",
  },
  {
    french: "s'il vous plaît",
    english: "please",
    pronunciation: "seel voo PLEH",
    type: "phrase",
    example: "Pouvez-vous m'aider, s'il vous plaît?",
  },
  { french: "eau", english: "water", pronunciation: "OH", type: "noun", example: "Je voudrais un verre d'eau." },
  {
    french: "maison",
    english: "house",
    pronunciation: "meh-ZOHN",
    type: "noun",
    example: "J'habite dans une grande maison.",
  },
  {
    french: "manger",
    english: "to eat",
    pronunciation: "mahn-ZHAY",
    type: "verb",
    example: "J'aime manger des croissants.",
  },
  {
    french: "livre",
    english: "book",
    pronunciation: "LEE-vruh",
    type: "noun",
    example: "Je lis un livre intéressant.",
  },
  {
    french: "école",
    english: "school",
    pronunciation: "ay-KOHL",
    type: "noun",
    example: "Les enfants vont à l'école.",
  },
  {
    french: "famille",
    english: "family",
    pronunciation: "fah-MEEL",
    type: "noun",
    example: "Ma famille est très importante.",
  },
]

export default function FrenchDictionary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredEntries, setFilteredEntries] = useState(frenchDictionary)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term === "") {
      setFilteredEntries(frenchDictionary)
    } else {
      const filtered = frenchDictionary.filter(
        (entry) =>
          entry.french.toLowerCase().includes(term.toLowerCase()) ||
          entry.english.toLowerCase().includes(term.toLowerCase()),
      )
      setFilteredEntries(filtered)
    }
  }

  const playPronunciation = (word: string) => {
    console.log(`Playing pronunciation for: ${word}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-2xl mr-2">🇫🇷</span>
            French Dictionary
          </h1>
          <p className="text-lg text-gray-600">Explore French words and their English translations</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search French or English words..."
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
                      <CardTitle className="text-2xl text-blue-600">{entry.french}</CardTitle>
                      <CardDescription className="text-lg">{entry.english}</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => playPronunciation(entry.french)}
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
