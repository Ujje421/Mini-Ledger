'use client'

import { useState, useRef, useEffect } from 'react'
import { askLedger } from '@/lib/api'
import { Send, Bot, User, Database, AlertCircle } from 'lucide-react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  dataUsed?: any[]
  isError?: boolean
}

export default function AskLedgerPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      content: 'Hello! I am your Smart Ledger AI. You can ask me questions about your transactions, spending habits, or income.',
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await askLedger(userMsg.content)
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: res.answer,
        dataUsed: res.data_used
      }
      setMessages(prev => [...prev, assistantMsg])
    } catch (error) {
      console.error('AI Error:', error)
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having a little trouble connecting to my AI brain right now. Please try again in a moment.",
        isError: true
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-nexus-bg rounded-xl border border-nexus-border shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 bg-nexus-card border-b border-nexus-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-nexus-primary">
          <Bot size={18} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-nexus-text">Ask Ledger AI</h2>
          <p className="text-[11px] text-nexus-textMuted">Powered by Gemini</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
              msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-white border border-nexus-border text-nexus-primary'
            }`}>
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            
            <div className={`flex flex-col max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`px-4 py-3 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-nexus-primary text-white rounded-2xl rounded-tr-sm' 
                  : msg.isError 
                    ? 'bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl rounded-tl-sm'
                    : 'bg-nexus-card border border-nexus-border text-nexus-text rounded-2xl rounded-tl-sm'
              }`}>
                {msg.isError && <AlertCircle size={14} className="inline-block mr-2 mb-0.5" />}
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
              
              {msg.dataUsed && msg.dataUsed.length > 0 && (
                <div className="mt-2 text-[11px] text-nexus-textMuted flex items-start gap-1.5 bg-nexus-card p-2.5 rounded-xl border border-nexus-border w-full shadow-sm">
                  <Database size={12} className="mt-0.5 flex-shrink-0" />
                  <details className="cursor-pointer group w-full">
                    <summary className="font-medium hover:text-nexus-text transition-colors outline-none flex items-center">Analyzed {msg.dataUsed.length} transactions</summary>
                    <div className="mt-2 max-h-32 overflow-y-auto font-mono text-[10px] bg-slate-50 p-2 rounded-lg border border-slate-200">
                      {JSON.stringify(msg.dataUsed, null, 2)}
                    </div>
                  </details>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-white border border-nexus-border text-nexus-primary flex items-center justify-center flex-shrink-0 shadow-sm">
              <Bot size={14} />
            </div>
            <div className="bg-nexus-card border border-nexus-border px-4 py-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm">
              <div className="w-1.5 h-1.5 bg-nexus-primary/40 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-nexus-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 bg-nexus-primary/80 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-nexus-card border-t border-nexus-border">
        <form onSubmit={handleSubmit} className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your spending..."
            className="flex-1 pl-4 pr-12 py-3 rounded-xl border border-nexus-border bg-slate-50 focus:bg-white focus:ring-1 focus:ring-nexus-primary focus:border-nexus-primary text-sm shadow-inner transition-all outline-none"
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || loading}
            className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square flex items-center justify-center bg-nexus-primary text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:hover:bg-nexus-primary shadow-sm"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  )
}
