import { useState, useRef, useCallback } from 'react';
import {
  day1Lessons,
  day2Lessons,
  day3Lessons,
  grammarTips,
  learningTips,
  scenarios,
  highFrequencyWords,
  type Phrase,
  type Lesson,
} from './data/turkishContent';

// Types
type TabType = 'home' | 'day1' | 'day2' | 'day3' | 'translator' | 'grammar' | 'tips';

// Icons as components (simple SVG)
const HomeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const BookIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
);
const MicIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
);
const LightbulbIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
);



// Phrase Card Component
function PhraseCard({ phrase, isCompact = false }: { phrase: Phrase; isCompact?: boolean }) {
  const [showPronunciation, setShowPronunciation] = useState(true);
  
  return (
    <div 
      className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:scale-[0.98] transition-transform cursor-pointer ${isCompact ? '' : 'mb-3'}`}
      onClick={() => setShowPronunciation(!showPronunciation)}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <p className="text-lg font-bold text-gray-900 leading-relaxed">{phrase.turkish}</p>
          <p className="text-sm text-red-600 font-medium mt-1">{phrase.english}</p>
          {showPronunciation && (
            <p className="text-xs text-gray-500 mt-2 italic bg-gray-50 px-2 py-1 rounded-lg inline-block">
              🔊 {phrase.pronunciation}
            </p>
          )}
          {phrase.context && (
            <p className="text-xs text-blue-600 mt-2 font-medium">💡 {phrase.context}</p>
          )}
        </div>
        <button
          className="p-2 rounded-full bg-red-50 text-red-600 flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            const utterance = new SpeechSynthesisUtterance(phrase.turkish);
            utterance.lang = 'tr-TR';
            utterance.rate = 0.85;
            speechSynthesis.speak(utterance);
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Lesson List Item
function LessonListItem({ lesson, onSelect, completed }: { lesson: Lesson; onSelect: () => void; completed: boolean }) {
  return (
    <button
      onClick={onSelect}
      className="w-full text-left bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-3 active:scale-[0.98] transition-all hover:border-red-200"
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl">{lesson.icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg">{lesson.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{lesson.phrases.length} phrases to learn</p>
        </div>
        {completed && (
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}

// Bottom Navigation
function BottomNav({ activeTab, onTabChange }: { activeTab: TabType; onTabChange: (tab: TabType) => void }) {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'day1', label: 'Day 1', icon: <span className="text-lg">📅</span> },
    { id: 'translator', label: 'Speak', icon: <MicIcon /> },
    { id: 'grammar', label: 'Grammar', icon: <BookIcon /> },
    { id: 'tips', label: 'Tips', icon: <LightbulbIcon /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
      <div className="max-w-lg mx-auto flex justify-around items-center py-2 pb-safe">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
              activeTab === tab.id ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            {tab.icon}
            <span className="text-xs mt-1 font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

// Header
function Header({ title, subtitle, showBack, onBack }: { title: string; subtitle?: string; showBack?: boolean; onBack?: () => void }) {
  return (
    <header className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white px-5 pt-12 pb-6 sticky top-0 z-40 safe-area-top">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          {showBack && onBack ? (
            <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-red-500/30 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : null}
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            {subtitle && <p className="text-red-100 text-sm mt-1">{subtitle}</p>}
          </div>
        </div>
      </div>
    </header>
  );
}



// HOME VIEW
function HomeView({ onStartDay }: { onStartDay: (day: number) => void }) {
  const totalPhrases = [...day1Lessons, ...day2Lessons, ...day3Lessons].reduce((sum, l) => sum + l.phrases.length, 0);
  
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white px-5 pt-12 pb-10 safe-area-top">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-5xl">🇹🇷</div>
            <div>
              <h1 className="text-2xl font-bold">Türkçe Crash Course</h1>
              <p className="text-red-100 text-sm">Master Turkish in 3 Days</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold">{totalPhrases}</p>
                <p className="text-xs text-red-100">Phrases</p>
              </div>
              <div>
                <p className="text-3xl font-bold">3</p>
                <p className="text-xs text-red-100">Days</p>
              </div>
              <div>
                <p className="text-3xl font-bold">7+</p>
                <p className="text-xs text-red-100">Scenarios</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 -mt-5">
        {/* Quick Start Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => onStartDay(1)}
            className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 text-center active:scale-95 transition-transform"
          >
            <div className="text-3xl mb-2">🎯</div>
            <p className="font-semibold text-sm text-gray-900">Day 1</p>
            <p className="text-xs text-gray-500">Essentials</p>
          </button>
          <button
            onClick={() => onStartDay(2)}
            className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 text-center active:scale-95 transition-transform"
          >
            <div className="text-3xl mb-2">🚍</div>
            <p className="font-semibold text-sm text-gray-900">Day 2</p>
            <p className="text-xs text-gray-500">Daily Life</p>
          </button>
          <button
            onClick={() => onStartDay(3)}
            className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 text-center active:scale-95 transition-transform"
          >
            <div className="text-3xl mb-2">📋</div>
            <p className="font-semibold text-sm text-gray-900">Day 3</p>
            <p className="text-xs text-gray-500">Official</p>
          </button>
        </div>

        {/* What You'll Learn */}
        <section className="mb-6">
          <h2 className="font-bold text-lg text-gray-900 mb-3">What You'll Master 📚</h2>
          
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Conversations</h3>
                  <p className="text-sm text-gray-600">Greetings, questions, daily interactions, cultural norms</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚌</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Transportation</h3>
                  <p className="text-sm text-gray-600">Metro, bus, taxi, directions, Istanbulkart</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎓</span>
                <div>
                  <h3 className="font-semibold text-gray-900">University</h3>
                  <p className="text-sm text-gray-600">Enrollment, YÖK, courses, scholarships, dormitory</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🪪</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Kimlik & Documents</h3>
                  <p className="text-sm text-gray-600">Residence permit, E-Devlet, banking, renting</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* High Frequency Words Preview */}
        <section className="mb-6">
          <h2 className="font-bold text-lg text-gray-900 mb-3">⚡ Top 20 Words (Learn These First!)</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="grid grid-cols-2 gap-2">
              {highFrequencyWords.slice(0, 20).map((word, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="font-bold text-red-600 text-sm">{word.word}</p>
                  <p className="text-xs text-gray-600 truncate">{word.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="mb-6">
          <h2 className="font-bold text-lg text-gray-900 mb-3">Tools & Features 🔧</h2>
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-mic-red bg-opacity-10 flex items-center justify-center text-2xl">🎤</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Voice Translator</h3>
                <p className="text-sm text-gray-500">Speak in English, get Turkish translations + conversation context</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">📖</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Grammar Guide</h3>
                <p className="text-sm text-gray-500">Essential patterns explained simply</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-2xl">💡</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Pro Tips & Tricks</h3>
                <p className="text-sm text-gray-500">Memory hacks, cultural tips, efficiency strategies</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// DAY LESSON VIEW
function DayLessonView({
  dayNumber,
  lessons,
  onSelectLesson,
  selectedLesson,
  onBack,
}: {
  dayNumber: number;
  lessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
  selectedLesson: Lesson | null;
  onBack: () => void;
}) {
  if (selectedLesson) {
    return (
      <div className="pb-24 min-h-screen bg-gray-50">
        <Header
          title={selectedLesson.title}
          showBack
          onBack={() => onSelectLesson(null as unknown as Lesson)}
        />
        
        <div className="max-w-lg mx-auto px-5 pt-6">
          {selectedLesson.tips && selectedLesson.tips.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
              <p className="text-yellow-800 text-sm font-medium">
                💡 <strong>Tip:</strong> {selectedLesson.tips[0]}
              </p>
            </div>
          )}
          
          {selectedLesson.phrases.map((phrase, idx) => (
            <PhraseCard key={idx} phrase={phrase} />
          ))}
          
          <div className="mt-6 text-center text-sm text-gray-500 pb-4">
            Tap any card to hide/show pronunciation • Tap 🔊 to hear it
          </div>
        </div>
      </div>
    );
  }

  const subtitles = [
    '',
    'Survival Essentials - Greetings, Numbers, Emergency',
    'Daily Life - Transportation, Shopping, Food, Places',
    'Official Matters - University, Kimlik, Banking'
  ];

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      <Header 
        title={`Day ${dayNumber}`} 
        subtitle={subtitles[dayNumber]}
      />
      
      <div className="max-w-lg mx-auto px-5 pt-6">
        {/* Day Navigation */}
        <div className="flex gap-2 mb-6 sticky top-[120px] z-20 bg-gray-50 pt-2">
          {[1, 2, 3].map((d) => (
            <button
              key={d}
              onClick={onBack}
              className={`py-2 px-4 rounded-xl font-semibold text-sm transition-all ${
                d === dayNumber
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              Day {d}
            </button>
          ))}
        </div>

        {/* Day Overview */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-5 mb-6 border border-red-100">
          <h2 className="font-bold text-lg text-gray-900 mb-2">
            Day {dayNumber === 1 ? 'Survival Essentials' : dayNumber === 2 ? 'Daily Life & Navigation' : 'Official Business'}
          </h2>
          <p className="text-sm text-gray-600">
            {dayNumber === 1 && "Today you'll master greetings, numbers, emergency phrases, essential verbs, and question words - everything you need to survive your first day!"}
            {dayNumber === 2 && "Learn transportation vocabulary, shopping & payment terms, reading receipts, food ordering, and finding places around town."}
            {dayNumber === 3 && "Tackle university enrollment, residence permit (kimlik), official conversations, banking procedures, and housing."}
          </p>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-lg font-medium">
              {lessons.length} Lessons
            </span>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-medium">
              {lessons.reduce((sum, l) => sum + l.phrases.length, 0)} Phrases
            </span>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <LessonListItem
              key={lesson.id}
              lesson={lesson}
              onSelect={() => onSelectLesson(lesson)}
              completed={false}
            />
          ))}
        </div>

        {/* Day Tip */}
        <div className="bg-indigo-50 rounded-2xl p-5 mt-6 border border-indigo-100">
          <h3 className="font-bold text-indigo-900 mb-2">🎯 Today's Focus Goal</h3>
          <p className="text-sm text-indigo-800">
            {dayNumber === 1 && "Be able to greet people confidently, ask basic questions, handle emergencies, and count to 20."}
            {dayNumber === 2 && "Navigate transportation independently, shop, pay, order food, and find your way around."}
            {dayNumber === 3 && "Handle government offices, understand documents, open bank accounts, and manage official paperwork."}
          </p>
        </div>
      </div>
    </div>
  );
}

// VOICE TRANSLATOR VIEW
function VoiceTranslatorView() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [turkishTranslation, setTurkishTranslation] = useState<Phrase[]>([]);
  const [detectedScenario, setDetectedScenario] = useState<typeof scenarios[0] | null>(null);
  const [error, setError] = useState('');
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  // Translation map (basic keyword matching)
  const translationMap: Record<string, Phrase[]> = {
    'hello': [{ turkish: 'Merhaba', english: 'Hello', pronunciation: 'mer-HA-ba' }],
    'hi': [{ turkish: 'Merhaba', english: 'Hi', pronunciation: 'mer-HA-ba' }],
    'good morning': [{ turkish: 'Günaydın', english: 'Good morning', pronunciation: 'gü-NAY-dın' }],
    'thank you': [{ turkish: 'Teşekkürler / Teşekkür ederim', english: 'Thank you', pronunciation: 'te-she-kür-LER / te-she-kür e-de-RIM' }],
    'sorry': [{ turkish: 'Özür dilerim', english: 'Sorry', pronunciation: 'ö-ZÜR di-le-RIM' }],
    'yes': [{ turkish: 'Evet', english: 'Yes', pronunciation: 'E-vet' }],
    'no': [{ turkish: 'Hayır', english: 'No', pronunciation: 'ha-YIR' }],
    'please': [{ turkish: 'Lütfen', english: 'Please', pronunciation: 'LÜT-fen' }],
    'how are you': [{ turkish: 'Nasılsınız?', english: 'How are you?', pronunciation: 'na-sul-SUH-niz?' }],
    'how much': [{ turkish: 'Kaç para? / Ne kadar?', english: 'How much?', pronunciation: 'kach pa-RA? / ne ka-dar?' }],
    'where is': [{ turkish: '... nerede?', english: 'Where is...?', pronunciation: '... ne-RE-de?' }],
    'help': [{ turkish: 'Yardım edin!', english: 'Help!', pronunciation: 'yar-DEEM e-DIN!' }],
    'i want': [{ turkish: '... istiyorum', english: 'I want...', pronunciation: '... is-ti-YO-room' }],
    'i need': [{ turkish: '... lazım / ihtiyacım var', english: 'I need...', pronunciation: '... la-ZUM / ih-ti-ya-jim var' }],
    'water': [{ turkish: 'Su lütfen', english: 'Water please', pronunciation: 'su LÜT-fen' }],
    'check please': [{ turkish: 'Bir hesap lütfen', english: 'The check please', pronunciation: 'bir he-SAP LÜT-fen' }],
    'bathroom': [{ turkish: 'Tuvalet nerede?', english: 'Where is restroom?', pronunciation: 'tu-va-LET ne-RE-de?' }],
    'toilet': [{ turkish: 'Tuvalet nerede?', english: 'Where is toilet?', pronunciation: 'tu-va-LET ne-RE-de?' }],
    'bus': [{ turkish: 'Otobüs durağı nerede?', english: 'Where is bus stop?', pronunciation: 'o-to-BÜS du-ra-gı ne-RE-de?' }],
    'taxi': [{ turkish: 'Taksi lütfen / Taksi duragı nerede?', english: 'Taxi please / Where is taxi stand?', pronunciation: 'tak-SI LÜT-fen / tak-SI du-ra-gı ne-RE-de?' }],
    'metro': [{ turkish: 'Metro istasyonu nerede?', english: 'Where is metro station?', pronunciation: 'ME-tro i-sta-syo-NU ne-RE-de?' }],
    'hospital': [{ turkish: 'Hastane nerede?', english: 'Where is hospital?', pronunciation: 'has-ta-NE ne-RE-de?' }],
    'pharmacy': [{ turkish: 'Eczane nerede?', english: 'Where is pharmacy?', pronunciation: 'ej-Za-NE ne-RE-de?' }],
    'bank': [{ turkish: 'Banka nerede?', english: 'Where is bank?', pronunciation: 'ban-KA ne-RE-de?' }],
    'airport': [{ turkish: 'Havalimanına gitmek istiyorum', english: 'I want to go to airport', pronunciation: 'ha-va-li-ma-nı-na git-MEK is-ti-YO-room' }],
    'hotel': [{ turkish: 'Otel nerede?', english: 'Where is hotel?', pronunciation: 'o-TEL ne-RE-de?' }],
    'food': [{ turkish: 'Yemek istiyorum / Bir şey yiyeceğim', english: 'I want food / I will eat something', pronunciation: 'ye-MEK is-ti-YO-room / bir shey yi-ye-CIM' }],
    'menu': [{ turkish: 'Menüyü görebilir miyim?', english: 'Can I see menu?', pronunciation: 'me-nü-YÜ gö-re-bi-lir MI-yim?' }],
    'card': [{ turkish: 'Kredi kartıyla ödeyebilir miyim?', english: 'Can I pay by card?', pronunciation: 'kre-DI kar-tıy-la ö-de-ye-bi-lir MI-yim?' }],
    'cash': [{ turkish: 'Nakit ödeme yapabilirim', english: 'I can pay cash', pronunciation: 'na-kit ö-de-me ya-pa-bi-li-rim' }],
    'receipt': [{ turkish: 'Fiş/Makbuz istiyorum', english: 'Receipt please', pronunciation: 'fish/mak-BOOZ is-ti-YO-room' }],
    'change': [{ turkish: 'Para üstü / Bozluk', english: 'Change / Small money', pronunciation: 'pa-ra üs-TÜ / bol-ZOOK' }],
    'appointment': [{ turkish: 'Randevum var', english: 'I have an appointment', pronunciation: 'ran-de-voom VAR' }],
    'reservation': [{ turkish: 'Rezervasyon yaptırmak istiyorum', english: 'I want reservation', pronunciation: 're-zer-va-SION yak-tur-mak is-ti-YO-room' }],
    'form': [{ turkish: 'Formu doldurdum', english: 'I filled form', pronunciation: 'for-mu dol-DUR-doorm' }],
    'document': [{ turkish: 'Belge', english: 'Document', pronunciation: 'bel-GE' }],
    'passport': [{ turkish: 'Pasaport', english: 'Passport', pronunciation: 'pa-saport' }],
    'id card': [{ turkish: 'Kimlik kartı', english: 'ID card', pronunciation: 'kim-LIK kar-tı' },
               { turkish: 'Kimlik belgesi', english: 'ID document', pronunciation: 'kim-LIK bel-GE-si' }],
    'i don\'t understand': [{ turkish: 'Anlamadım', english: "I didn't understand", pronunciation: 'an-la-MA-dım' },
                           { turkish: 'Anlayamıyorum', english: "I can't understand", pronunciation: 'an-lah-ya-muh-YO-room' }],
    'do you speak english': [{ turkish: 'İngilizce biliyor musunuz?', english: 'Do you speak English?', pronunciation: 'in-gi-LIZ-ce bi-li-YOR mu-su-Nuz?' }],
    'repeat': [{ turkish: 'Tekrar eder misiniz? / Bir daha söyler misiniz?', english: 'Could you repeat?', pronunciation: 'te-kar E-der mi-si-NIZ? / bir da-HA söy-ler MI-si-NIZ?' }],
    'slower': [{ turkish: 'Daha yavaş konuşur musunuz?', english: 'Can you speak slower?', pronunciation: 'da-HA ya-vash ko-nu-shur mu-su-Nuz?' }],
    'left': [{ turkish: 'Sol / Sola dön', english: 'Left / Turn left', pronunciation: 'sol / so-la DÖN' }],
    'right': [{ turkish: 'Sağ / Sağa dön', english: 'Right / Turn right', pronunciation: 'sahsh / sa-ga DÖN' }],
    'straight': [{ turkish: 'Düz devam et / Düz gidin', english: 'Straight ahead', pronunciation: 'düz da-vam ET / düz gi-DIN' }],
    'far': [{ turkish: 'Uzak mı?', english: 'Is it far?', pronunciation: 'u-ZAK MI?' }],
    'near': [{ turkish: 'Yakın mı?', english: 'Is it near?', pronunciation: 'ya-kın MI?' }],
    'open': [{ turkish: 'Açık mı? / Açık olduğuna emin misiniz?', english: 'Is it open?', pronunciation: 'a-JUK MU?' }],
    'closed': [{ turkish: 'Kapalı mı?', english: 'Is it closed?', pronunciation: 'ka-pa-LUH MU?' }],
    'today': [{ turkish: 'Bugün', english: 'Today', pronunciation: 'bu-GÜN' }],
    'tomorrow': [{ turkish: 'Yarın', english: 'Tomorrow', pronunciation: 'ya-RUN' }],
    'now': [{ turkish: 'Şimdi', english: 'Now', pronunciation: 'SHIM-di' }],
    'later': [{ turkish: 'Sonra', english: 'Later', pronunciation: 'son-RA' }],
    'goodbye': [{ turkish: 'Görüşürüz', english: 'Goodbye', pronunciation: 'gö-rü-SHÜR-üz' }],
    'excuse me': [{ turkish: 'Affedersiniz / Pardon', english: 'Excuse me', pronunciation: 'af-fe-deR-si-NIZ / par-DON' }],
  };

  // Scenario detection keywords
  const scenarioKeywords: Record<string, typeof scenarios[0]> = {};
  scenarios.forEach(s => {
    s.userPhrases.forEach(p => {
      const enWords = p.english.toLowerCase().split(/\s+/);
      enWords.slice(0, 3).forEach(w => {
        if (w.length > 3) scenarioKeywords[w] = s;
      });
    });
  });

  const startListening = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      setError('Voice recognition not supported in this browser');
      return;
    }
    const recognition = new SpeechRecognitionAPI();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
      setTranscript('');
      setTurkishTranslation([]);
      setDetectedScenario(null);
    };

    recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      const text = result[0].transcript.toLowerCase().trim();
      setTranscript(text);

      // Find matching translation
      let foundTranslations: Phrase[] = [];
      
      Object.entries(translationMap).forEach(([key, value]) => {
        if (text.includes(key.toLowerCase())) {
          foundTranslations = value;
        }
      });

      // Also check partial matches
      if (foundTranslations.length === 0) {
        const words = text.split(/\s+/);
        for (const word of words) {
          if (translationMap[word]) {
            foundTranslations = translationMap[word];
            break;
          }
        }
      }

      setTurkishTranslation(foundTranslations);

      // Detect scenario
      const words = text.split(/\s+/);
      for (const word of words) {
        if (scenarioKeywords[word]) {
          setDetectedScenario(scenarioKeywords[word]);
          break;
        }
      }
    };

    recognition.onerror = (event: any) => {
      setError(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      <Header title="Voice Translator" subtitle="Speak English → Get Turkish" />
      
      <div className="max-w-lg mx-auto px-5 pt-6">
        {/* Mic Button */}
        <div className="flex justify-center my-8">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`w-28 h-28 rounded-full flex items-center justify-center transition-all transform ${
              isListening
                ? 'bg-red-500 scale-110 animate-pulse shadow-lg shadow-red-300'
                : 'bg-gradient-to-br from-red-500 to-red-700 shadow-xl'
            }`}
          >
            <svg
              className={`${isListening ? 'w-10 h-10' : 'w-12 h-12'} text-white`}
              fill={isListening ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mb-6">
          {isListening ? '🔴 Listening... Speak now!' : 'Tap the microphone button'}
        </p>

        {error && error !== 'no-speech' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Transcript */}
        {transcript && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">You said:</p>
            <p className="text-lg font-semibold text-gray-900 capitalize">"{transcript}"</p>
          </div>
        )}

        {/* Translation */}
        {turkishTranslation.length > 0 && (
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-5 shadow-sm border border-red-100 mb-4">
            <p className="text-xs text-red-600 uppercase tracking-wide font-medium mb-3">Turkish Translation:</p>
            {turkishTranslation.map((phrase, idx) => (
              <div key={idx} className="mb-3 last:mb-0">
                <p className="text-2xl font-bold text-gray-900">{phrase.turkish}</p>
                <p className="text-sm text-red-600 mt-1">{phrase.english}</p>
                <p className="text-sm text-gray-500 italic mt-1">🔊 {phrase.pronunciation}</p>
                <button
                  onClick={() => {
                    const u = new SpeechSynthesisUtterance(phrase.turkish);
                    u.lang = 'tr-TR';
                    u.rate = 0.85;
                    speechSynthesis.speak(u);
                  }}
                  className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1"
                >
                  ▶️ Play audio
                </button>
              </div>
            ))}
          </div>
        )}

        {transcript && turkishTranslation.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
            <p className="text-yellow-800 text-sm">
              ⚠️ No exact match found. Try one of these common phrases or check our lesson content!
            </p>
          </div>
        )}

        {/* Detected Scenario */}
        {detectedScenario && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{detectedScenario.scenario.split(' ')[0]}</span>
              <h3 className="font-bold text-gray-900">Related Conversation: {detectedScenario.scenario.replace(/^[^\s]+\s/, '')}</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-2">🗣️ Say This:</p>
                {detectedScenario.userPhrases.map((p, i) => (
                  <div key={i} className="bg-blue-50 rounded-lg p-3 mb-2 last:mb-0">
                    <p className="font-semibold text-gray-900">{p.turkish}</p>
                    <p className="text-sm text-gray-600">{p.english}</p>
                    <p className="text-xs text-gray-500 italic">{p.pronunciation}</p>
                  </div>
                ))}
              </div>
              
              <div>
                <p className="text-xs text-green-600 font-medium uppercase tracking-wide mb-2">👂 You Might Hear:</p>
                {detectedScenario.likelyResponses.map((p, i) => (
                  <div key={i} className="bg-green-50 rounded-lg p-3 mb-2 last:mb-0">
                    <p className="font-semibold text-gray-900">{p.turkish}</p>
                    <p className="text-sm text-gray-600">{p.english}</p>
                    <p className="text-xs text-gray-500 italic">{p.pronunciation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Common Phrases Grid */}
        <div className="mt-6">
          <h3 className="font-bold text-gray-900 mb-3">⚡ Quick Phrases (Tap to use)</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { tr: 'Merhaba', en: 'Hello' },
              { tr: 'Teşekkürler', en: 'Thank you' },
              { tr: 'Ne kadar?', en: 'How much?' },
              { tr: 'Anlamadım', en: "I don't understand" },
              { tr: 'Lütfen', en: 'Please' },
              { tr: 'Nerede?', en: 'Where is?' },
              { tr: 'Evet/Hayır', en: 'Yes/No' },
              { tr: 'Bir hesap lütfen', en: 'Check please' },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  setTranscript(item.en);
                  setTurkishTranslation([{ turkish: item.tr, english: item.en, pronunciation: '' }]);
                  const u = new SpeechSynthesisUtterance(item.tr);
                  u.lang = 'tr-TR';
                  speechSynthesis.speak(u);
                }}
                className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-left active:bg-red-50 transition-colors"
              >
                <p className="font-semibold text-red-600 text-sm">{item.tr}</p>
                <p className="text-xs text-gray-500">{item.en}</p>
              </button>
            ))}
          </div>
        </div>

        {/* All Scenarios */}
        <div className="mt-8">
          <h3 className="font-bold text-gray-900 mb-3">📋 Conversation Scenarios</h3>
          <div className="space-y-3">
            {scenarios.map((s, i) => (
              <details key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                <summary className="p-4 cursor-pointer flex items-center justify-between font-medium text-gray-900">
                  <span>{s.scenario}</span>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-blue-600 mb-2">Say:</p>
                    {s.userPhrases.map((p, j) => (
                      <div key={j} className="last:mb-0 mb-2">
                        <p className="font-semibold text-sm">{p.turkish}</p>
                        <p className="text-xs text-gray-600">{p.english}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-green-600 mb-2">Expect to hear:</p>
                    {s.likelyResponses.map((p, j) => (
                      <div key={j} className="last:mb-0 mb-2">
                        <p className="font-semibold text-sm">{p.turkish}</p>
                        <p className="text-xs text-gray-600">{p.english}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// GRAMMAR VIEW
function GrammarView() {
  const [expandedTip, setExpandedTip] = useState<number>(0);

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      <Header title="Grammar Guide" subtitle="Essential patterns made simple" />
      
      <div className="max-w-lg mx-auto px-5 pt-6">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 mb-6 border border-purple-100">
          <h2 className="font-bold text-purple-900 mb-2">🧠 How to Use This Guide</h2>
          <p className="text-sm text-purple-800">
            Don't memorize everything! Focus on understanding the PATTERNS. Turkish is logical once you grasp the structure.
          </p>
        </div>

        {grammarTips.map((tip, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-4 overflow-hidden">
            <button
              onClick={() => setExpandedTip(expandedTip === idx ? -1 : idx)}
              className="w-full p-5 text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </span>
                <h3 className="font-bold text-gray-900 pr-4">{tip.title}</h3>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${expandedTip === idx ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedTip === idx && (
              <div className="px-5 pb-5 border-t border-gray-100">
                <p className="text-gray-700 mt-4 mb-4">{tip.content}</p>
                
                {(tip.rule || tip.examples?.[0]?.tip) && tip.rule && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <p className="text-yellow-800 text-sm font-medium">📌 Rule: {tip.rule}</p>
                  </div>
                )}

                {tip.examples && (
                  <div className="space-y-2">
                    {tip.examples.map((ex, j) => (
                      <div key={j} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <p className="font-bold text-red-600 text-lg">{ex.tr}</p>
                          <p className="text-sm text-gray-600">{ex.en}</p>
                        </div>
                        {ex.tip && (
                          <p className="text-xs text-gray-500 italic mt-1">💡 {ex.tip}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-5 text-white mt-6">
          <h3 className="font-bold text-lg mb-2">✨ The 80/20 Rule</h3>
          <p className="text-sm opacity-90">
            Learn these 10 patterns and you'll understand 80% of everyday Turkish:<br/><br/>
            ✅ -yorum/-iyorum (present tense)<br/>
            ✅ Vowel harmony (suffixes match)<br/>
            ✅ var/yok (there is/isn't)<br/>
            ✅ -de/-da (location)<br/>
            ✅ -e/-a (direction)<br/>
            ✅ -den/-dan (from)<br/>
            ✅ Question particle mi<br/>
            ✅ Negation -me/-ma<br/>
            ✅ Possessive suffixes<br/>
            ✅ Demonstratives (bu/şu/o)
          </p>
        </div>
      </div>
    </div>
  );
}

// TIPS VIEW
function TipsView() {
  const [expandedCategory, setExpandedCategory] = useState<number>(0);

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      <Header title="Tips & Tricks" subtitle="Learn smarter, not harder" />
      
      <div className="max-w-lg mx-auto px-5 pt-6">
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-5 mb-6 border border-yellow-100">
          <h2 className="font-bold text-amber-900 mb-2">⚡ Maximum Efficiency Strategy</h2>
          <p className="text-sm text-amber-800">
            Your goal isn't fluency—it's FUNCTIONAL communication. Focus on what gets results NOW.
          </p>
        </div>

        {learningTips.map((category, catIdx) => (
          <div key={catIdx} className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-4 overflow-hidden">
            <button
              onClick={() => setExpandedCategory(expandedCategory === catIdx ? -1 : catIdx)}
              className="w-full p-5 text-left flex items-center justify-between"
            >
              <h3 className="font-bold text-gray-900">{category.category}</h3>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-3 ${expandedCategory === catIdx ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedCategory === catIdx && (
              <div className="px-5 pb-5 border-t border-gray-100">
                <ul className="mt-4 space-y-3">
                  {category.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                        {tipIdx + 1}
                      </span>
                      <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {/* Pro Tips Summary */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white mt-6">
          <h3 className="font-bold text-lg mb-3">🏆 Success Checklist</h3>
          <ul className="space-y-2 text-sm opacity-95">
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">☑</span>
              Practice speaking OUT LOUD every day
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">☑</span>
              Review previous day's material before starting new
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">☑</span>
              Don't be afraid to make mistakes
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">☑</span>
              Use voice translator when stuck
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">☑</span>
              Immerse yourself with Turkish media
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// MAIN APP COMPONENT
export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const getLessonsForDay = (day: number): Lesson[] => {
    switch (day) {
      case 1: return day1Lessons;
      case 2: return day2Lessons;
      case 3: return day3Lessons;
      default: return day1Lessons;
    }
  };

  const handleStartDay = (day: number) => {
    setCurrentDay(day);
    setSelectedLesson(null);
    setActiveTab(`day${day}` as TabType);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans select-none" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Main Content */}
      <main>
        {activeTab === 'home' && (
          <HomeView onStartDay={handleStartDay} />
        )}
        
        {(activeTab === 'day1' || activeTab === 'day2' || activeTab === 'day3') && (
          <DayLessonView
            dayNumber={currentDay}
            lessons={getLessonsForDay(currentDay)}
            onSelectLesson={setSelectedLesson}
            selectedLesson={selectedLesson}
            onBack={() => setActiveTab('home')}
          />
        )}
        
        {activeTab === 'translator' && (
          <VoiceTranslatorView />
        )}
        
        {activeTab === 'grammar' && (
          <GrammarView />
        )}
        
        {activeTab === 'tips' && (
          <TipsView />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={(tab) => {
        setSelectedLesson(null);
        if (tab === 'day1') { setCurrentDay(1); }
        else if (tab === 'day2') { setCurrentDay(2); }
        else if (tab === 'day3') { setCurrentDay(3); }
        setActiveTab(tab);
      }} />
    </div>
  );
}

// Type declarations for Web Speech API
/* eslint-disable @typescript-eslint/no-explicit-any */
interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
