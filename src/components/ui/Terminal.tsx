"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { terminalCommands, personalInfo } from "@/lib/data";

interface TerminalLine {
  type: "input" | "output" | "system" | "error" | "success";
  content: string;
  timestamp?: string;
}

export function Terminal() {
  const [input, setInput] = useState("");
  // Initial state is empty to prevent hydration mismatch
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  function getTimestamp() {
    return new Date().toLocaleTimeString('en-US', { hour12: false });
  }

  // Initialize terminal history on mount
  useEffect(() => {
    setHistory([
      { 
        type: "system", 
        content: `┌──(${personalInfo.name.toLowerCase().replace(/\s+/g, '')}㉿kali)-[~]
└─$ neofetch --ascii_distro kali`,
        timestamp: getTimestamp()
      },
      {
        type: "output",
        content: `
       ,.....                                       
   .,;::::::::::::,                      ${personalInfo.name}
 .::::::::'''''::::::.                   ──────────────────
::::''          ''::::                   OS: Kali GNU/Linux
:::            .;::::::                  Host: Portfolio v2.0
'::          .:::::::::'                 Kernel: Security-focused
 ':.........:::::::::'                   Shell: zsh 5.9
   ':::::::::'''''                       Terminal: web-terminal
                                         CPU: Red Team Mindset
`,
      },
      { 
        type: "success", 
        content: `[+] Welcome to the interactive terminal!
[+] Type "help" for available commands.`,
        timestamp: getTimestamp()
      },
    ]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === "") return;

    const username = personalInfo.name.toLowerCase().replace(/\s+/g, '');
    
    // Add input to history display with Kali-style prompt
    const newHistory: TerminalLine[] = [
      ...history,
      { 
        type: "input", 
        content: `┌──(${username}㉿kali)-[~]\n└─$ ${cmd}`,
        timestamp: getTimestamp()
      },
    ];

    // Add to command history for up/down navigation
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    // Handle clear command specially
    if (trimmedCmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    // Simulate typing effect
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));
    setIsTyping(false);

    // Get response with enhanced formatting
    let response: TerminalLine;
    
    if (terminalCommands[trimmedCmd]) {
      response = { 
        type: "output", 
        content: terminalCommands[trimmedCmd],
        timestamp: getTimestamp()
      };
    } else if (trimmedCmd === "nmap") {
      response = {
        type: "output",
        content: `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for portfolio.local (127.0.0.1)
Host is up (0.00012s latency).

PORT     STATE    SERVICE      VERSION
22/tcp   open     ssh          OpenSSH 8.9
80/tcp   open     http         nginx 1.18.0
443/tcp  open     https        nginx 1.18.0
8080/tcp filtered http-proxy

[!] This is a simulation. No actual scan performed.`,
        timestamp: getTimestamp()
      };
    } else if (trimmedCmd === "whoami") {
      response = {
        type: "success",
        content: `${username}\n[+] Role: Red Team Specialist\n[+] Status: Active`,
        timestamp: getTimestamp()
      };
    } else if (trimmedCmd === "id") {
      response = {
        type: "output",
        content: `uid=1000(${username}) gid=1000(${username}) groups=1000(${username}),27(sudo),1001(pentest)`,
        timestamp: getTimestamp()
      };
    } else if (trimmedCmd === "uname -a") {
      response = {
        type: "output",
        content: `Linux kali 6.1.0-kali9-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.27-1kali1 x86_64 GNU/Linux`,
        timestamp: getTimestamp()
      };
    } else if (trimmedCmd.startsWith("ping")) {
      response = {
        type: "output",
        content: `PING portfolio.local (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.023 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.031 ms

--- portfolio.local ping statistics ---
2 packets transmitted, 2 received, 0% packet loss`,
        timestamp: getTimestamp()
      };
    } else if (trimmedCmd === "ifconfig" || trimmedCmd === "ip a") {
      response = {
        type: "output",
        content: `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.10.14.25  netmask 255.255.254.0  broadcast 10.10.15.255
        ether 00:0c:29:xx:xx:xx  txqueuelen 1000  (Ethernet)

tun0: flags=4305<UP,POINTOPOINT,RUNNING,NOARP,MULTICAST>  mtu 1500
        inet 10.10.16.42  netmask 255.255.254.0  destination 10.10.16.42`,
        timestamp: getTimestamp()
      };
    } else if (trimmedCmd === "date") {
      response = {
        type: "output",
        content: new Date().toString(),
        timestamp: getTimestamp()
      };
    } else if (trimmedCmd === "uptime") {
      response = {
        type: "output",
        content: ` ${getTimestamp()} up 42 days, 13:37,  1 user,  load average: 0.42, 0.33, 0.27`,
        timestamp: getTimestamp()
      };
    } else if (trimmedCmd === "cat /etc/passwd") {
      response = {
        type: "output",
        content: `root:x:0:0:root:/root:/bin/bash
${username}:x:1000:1000:Red Team Specialist:/home/${username}:/bin/zsh
[...] (84 more lines)`,
        timestamp: getTimestamp()
      };
    } else if (trimmedCmd === "sudo -l") {
      response = {
        type: "success",
        content: `[sudo] password for ${username}: 
User ${username} may run the following commands on kali:
    (ALL : ALL) ALL
    
[!] Nice try! But this is just a simulation 😉`,
        timestamp: getTimestamp()
      };
    } else if (trimmedCmd.startsWith("echo")) {
      const echoContent = cmd.substring(5).trim();
      response = {
        type: "output",
        content: echoContent || "",
        timestamp: getTimestamp()
      };
    } else if (trimmedCmd === "history") {
      response = {
        type: "output",
        content: commandHistory.map((c, i) => `  ${i + 1}  ${c}`).join('\n') || "No commands in history",
        timestamp: getTimestamp()
      };
    } else {
      response = { 
        type: "error", 
        content: `bash: ${trimmedCmd}: command not found\n[!] Type 'help' for available commands.`,
        timestamp: getTimestamp()
      };
    }

    newHistory.push(response);
    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Auto-complete
      const allCommands = [...Object.keys(terminalCommands), "nmap", "id", "uname", "ping", "ifconfig", "ip", "date", "uptime", "history", "echo", "cat", "sudo"];
      const matches = allCommands.filter((cmd) => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setHistory(prev => [...prev, {
          type: "output",
          content: matches.join("  "),
          timestamp: getTimestamp()
        }]);
      }
    } else if (e.ctrlKey && e.key === "c") {
      setInput("");
      setHistory(prev => [...prev, {
        type: "input",
        content: `^C`,
        timestamp: getTimestamp()
      }]);
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setHistory([]);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const username = personalInfo.name.toLowerCase().replace(/\s+/g, '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      onClick={focusInput}
      className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-2xl shadow-primary/10 border border-primary/30"
      style={{
        background: "linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)",
      }}
    >
      {/* Terminal Header - Kali Style */}
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] border-b border-primary/30">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" />
          </div>
          <div className="ml-3 flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary font-bold">
              BASH
            </span>
            <span className="text-xs text-gray-400 font-mono">
              {username}@kali: ~
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="hidden sm:inline">🔒 SSH</span>
          <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-[10px] font-mono">
            ● connected
          </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="p-4 h-72 overflow-y-auto font-mono text-sm scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent"
        style={{ 
          background: "linear-gradient(180deg, #0d1117 0%, #010409 100%)",
        }}
      >
        {history.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
            className={`whitespace-pre-wrap mb-1 leading-relaxed ${
              line.type === "input" 
                ? "text-white" 
                : line.type === "error"
                ? "text-red-400"
                : line.type === "success"
                ? "text-green-400"
                : line.type === "system"
                ? "text-cyan-400"
                : "text-gray-400"
            }`}
          >
            {/* Kali-style prompt coloring for input */}
            {line.type === "input" ? (
              <span>
                <span className="text-cyan-400">┌──(</span>
                <span className="text-red-400 font-bold">{username}</span>
                <span className="text-cyan-400">㉿</span>
                <span className="text-red-400 font-bold">kali</span>
                <span className="text-cyan-400">)-[</span>
                <span className="text-white font-bold">~</span>
                <span className="text-cyan-400">]</span>
                {"\n"}
                <span className="text-cyan-400">└─</span>
                <span className="text-red-400 font-bold">$</span>
                <span className="text-white"> {line.content.split('$ ')[1] || ''}</span>
              </span>
            ) : (
              line.content
            )}
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="text-gray-500 animate-pulse">
            Processing...
          </div>
        )}

        {/* Input Line - Kali Style */}
        <div className="flex flex-col text-sm mt-1">
          <span>
            <span className="text-cyan-400">┌──(</span>
            <span className="text-red-400 font-bold">{username}</span>
            <span className="text-cyan-400">㉿</span>
            <span className="text-red-400 font-bold">kali</span>
            <span className="text-cyan-400">)-[</span>
            <span className="text-white font-bold">~</span>
            <span className="text-cyan-400">]</span>
          </span>
          <div className="flex items-center">
            <span className="text-cyan-400">└─</span>
            <span className="text-red-400 font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white ml-1 caret-green-400"
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
            />
            <span className="w-2 h-4 bg-green-400 animate-pulse ml-0.5" />
          </div>
        </div>
      </div>

      {/* Terminal Footer - Status Bar */}
      <div className="px-4 py-2 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] border-t border-primary/30 flex items-center justify-between">
        <div className="flex items-center gap-3 text-[10px] text-gray-500">
          <span className="text-green-400">●</span>
          <span>zsh</span>
          <span className="text-gray-600">|</span>
          <span>UTF-8</span>
          <span className="text-gray-600">|</span>
          <span>~</span>
        </div>
        <div className="text-[10px] text-gray-500">
          <span className="text-primary">TIP:</span>{" "}
          <span className="text-gray-400">help</span>{" "}
          <span className="text-gray-600">|</span>{" "}
          <span className="text-gray-400">nmap</span>{" "}
          <span className="text-gray-600">|</span>{" "}
          <span className="text-gray-400">whoami</span>
        </div>
      </div>
    </motion.div>
  );
}
