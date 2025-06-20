"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Volume2 } from "lucide-react"

interface DictionaryEntry {
  german: string
  english: string
  pronunciation: string
  type: string
  example: string
}

const germanDictionary: DictionaryEntry[] = [
  {
    german: "hallo",
    english: "hello",
    pronunciation: "HAH-loh",
    type: "interjection",
    example: "Hallo! Wie geht es dir?",
  },
  {
    german: "auf wiedersehen",
    english: "goodbye",
    pronunciation: "owf VEE-der-zayn",
    type: "interjection",
    example: "Auf Wiedersehen! Bis morgen!",
  },
  {
    german: "danke",
    english: "thank you",
    pronunciation: "DAHN-kuh",
    type: "interjection",
    example: "Danke für deine Hilfe.",
  },
  {
    german: "bitte",
    english: "please/you're welcome",
    pronunciation: "BIT-tuh",
    type: "interjection",
    example: "Kannst du mir bitte helfen?",
  },
  {
    german: "wasser",
    english: "water",
    pronunciation: "VAH-ser",
    type: "noun",
    example: "Ich möchte ein Glas Wasser.",
  },
  { german: "haus", english: "house", pronunciation: "HOWS", type: "noun", example: "Mein Haus ist sehr groß." },
  { german: "essen", english: "to eat", pronunciation: "ES-sen", type: "verb", example: "Ich esse gerne Pizza." },
  {
    german: "buch",
    english: "book",
    pronunciation: "BOOKH",
    type: "noun",
    example: "Ich lese ein interessantes Buch.",
  },
  {
    german: "schule",
    english: "school",
    pronunciation: "SHOO-luh",
    type: "noun",
    example: "Die Kinder gehen zur Schule.",
  },
  {
    german: "familie",
    english: "family",
    pronunciation: "fah-MEE-lee-uh",
    type: "noun",
    example: "Meine Familie ist sehr wichtig.",
  },
]

export default function GermanDictionary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredEntries, setFilteredEntries] = useState(germanDictionary)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term === "") {
      setFilteredEntries(germanDictionary)
    } else {
      const filtered = germanDictionary.filter(
        (entry) =>
          entry.german.toLowerCase().includes(term.toLowerCase()) ||
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
            <span className="text-2xl mr-2">🇩🇪</span>
            German Dictionary
          </h1>
          <p className="text-lg text-gray-600">Learn German words and their English translations</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search German or English words..."
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
                      <CardTitle className="text-2xl text-blue-600">{entry.german}</CardTitle>
                      <CardDescription className="text-lg">{entry.english}</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => playPronunciation(entry.german)}
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
