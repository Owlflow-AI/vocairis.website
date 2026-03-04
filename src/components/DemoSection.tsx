import { useState, useRef, useEffect } from 'react';
import { useConversation } from '@elevenlabs/react';
import AnimatedSection from './AnimatedSection';

// Match the user's provided dynamic variables structure
interface DynamicVariables {
    name: string;
    user_number: string;
    user_profile: string;
    recruiter_email: string;
    job_details: string;
    job_questions: string;
    eligibility_questions: string;
    company_provider: string;
}

interface DemoSectionProps {
    activeTab?: string;
}

export default function DemoSection({ activeTab = 'home' }: DemoSectionProps) {
    const isSupportTab = activeTab === 'supportCenter';
    const currentAgentId = isSupportTab ? 'agent_9101kjr4mzg6eykvbwz5vy2z0rk9' : 'agent_4701kjr0xcw3enh8w33xzsfqt2q6';

    const [showSettings, setShowSettings] = useState(false);

    // Captcha States
    const [showCaptchaModal, setShowCaptchaModal] = useState(false);
    const [captchaCode, setCaptchaCode] = useState('');
    const [userInputCaptcha, setUserInputCaptcha] = useState('');
    const [captchaError, setCaptchaError] = useState(false);

    // Default dynamic variables from user's prompt
    const [dynamicVariables, setDynamicVariables] = useState<DynamicVariables>({
        name: 'Sarah Jenkins',
        user_number: '+123456789',
        user_profile: 'Experienced software engineer...',
        recruiter_email: 'recruiter@company.com',
        job_details: 'Senior Product Manager role at TechFlow',
        job_questions: 'What is your experience with agile workflows?',
        eligibility_questions: 'Are you authorized to work in the US?',
        company_provider: 'VocAIris Solutions'
    });

    // ElevenLabs SDK integration
    const conversation = useConversation();
    const [callDuration, setCallDuration] = useState('00:00');
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Call timer logic
    useEffect(() => {
        if (conversation.status === 'connected') {
            let seconds = 0;
            timerRef.current = setInterval(() => {
                seconds++;
                const m = Math.floor(seconds / 60).toString().padStart(2, '0');
                const s = (seconds % 60).toString().padStart(2, '0');
                setCallDuration(`${m}:${s}`);
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
            if (conversation.status !== 'connecting') {
                setCallDuration('00:00');
            }
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [conversation.status]);

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const handleStartCall = () => {
        if (conversation.status === 'connected' || conversation.status === 'connecting') return;
        setUserInputCaptcha('');
        setCaptchaError(false);
        setCaptchaCode(generateCaptcha());
        setShowCaptchaModal(true);
    };

    const verifyAndStartCall = () => {
        if (userInputCaptcha.toUpperCase() === captchaCode) {
            setShowCaptchaModal(false);
            executeStartCall();
        } else {
            setCaptchaError(true);
        }
    };

    const executeStartCall = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });

            setShowSettings(false);

            const sessionConfig: any = {
                agentId: currentAgentId,
            };

            if (!isSupportTab) {
                sessionConfig.dynamicVariables = dynamicVariables;
            }

            await conversation.startSession(sessionConfig);
        } catch (error) {
            console.error('Failed to start conversation:', error);
            alert('Microphone access is required to talk to the AI agent.');
        }
    };

    const handleEndCall = async () => {
        await conversation.endSession();
    };

    const handleVariableChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDynamicVariables({
            ...dynamicVariables,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="live-demo" className="py-24 bg-white dark:bg-black relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="flex flex-col items-center justify-center text-center mb-16 space-y-5">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <span className="relative flex h-2 w-2">
                                <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${conversation.status === 'connected' ? 'bg-green-400 animate-ping' : 'bg-gray-400'}`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${conversation.status === 'connected' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                            </span>
                            <span className="text-xs font-mono text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                {conversation.status === 'connected' ? 'Agent Live' : 'Agent Ready'}
                            </span>
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1] max-w-3xl">
                            Watch AI Recruit in Real-Time
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-normal leading-relaxed max-w-2xl">
                            See how our voice agents screen, score, and schedule candidates automatically with human-like precision. You can even configure the agent's context!
                        </p>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                        {/* ── Left Panel: Call Monitor + Live Scoring ── */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {/* Live Call Card */}
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-7 shadow-xl relative overflow-hidden">
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>

                                <div className="flex items-center justify-between mb-7">
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-2.5 h-2.5 rounded-full ${conversation.status === 'connected' ? 'bg-red-500 animate-pulse' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
                                        <span className={`text-xs font-bold tracking-wider uppercase ${conversation.status === 'connected' ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                                            {conversation.status === 'connected' ? 'Live Call' : 'Call Waiting'}
                                        </span>
                                    </div>
                                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-md">{callDuration}</span>
                                </div>

                                <div className="flex flex-col items-center text-center mb-7">
                                    <div className="relative mb-5">
                                        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-lg relative">
                                            <img alt="Professional woman portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz0mwo7Rhez9Wv02Qv49bkv7TRBh1wXrKrctBLFqOI8AUIFXjA64rN0gskQMrShxSUf87pQ0B8plZLRtk5-8Rsqp32EKwV1jnY0Dm1w60ilpKMSS5f8zVKyiljAYKeG2fhFdRfqnVU6CyIaT4cnhsWHHxHZDCs2zRZ9qLFRMvdmzbbN_6zPiNk04oYvUKXSBxwmG3e0q9k5qBR9pn8Fi4NGCddFrd61iOAfrzfEYvq_FjgHcAwLNoha9h1TGGpghcCBoex1p02PqPt" />
                                            {conversation.status === 'connecting' && (
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                    <span className="material-icons text-white animate-spin">autorenew</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-gray-900 dark:bg-white rounded-full p-2 border-4 border-white dark:border-gray-900 flex items-center justify-center shadow-md">
                                            <span className="material-icons text-white dark:text-gray-900 text-[16px]">mic</span>
                                        </div>
                                    </div>
                                    <h3 className="text-gray-900 dark:text-white text-xl font-bold">{isSupportTab ? 'Support Responder' : dynamicVariables.name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1.5">{isSupportTab ? 'Customer Support Specialist' : `Applying for ${dynamicVariables.job_details.split(' role')[0]}`}</p>
                                </div>

                                {/* Waveform - Only animates when connected */}
                                <div className="flex items-center justify-center gap-1.5 h-14 mb-7">
                                    {[3, 5, 8, 6, 10, 7, 5, 3, 6, 4].map((h, i) => {
                                        let height = h * 4;
                                        if (conversation.status === 'connected' && conversation.isSpeaking) {
                                            height = h * (2 + Math.random() * 3);
                                        } else if (conversation.status !== 'connected') {
                                            height = 4;
                                        }

                                        return (
                                            <div
                                                key={i}
                                                className={`w-1 rounded-full transition-all duration-100 ${conversation.status === 'connected'
                                                    ? (i >= 2 && i <= 6 ? 'bg-gray-900 dark:bg-white animate-pulse' : 'bg-gray-300 dark:bg-gray-600 animate-pulse')
                                                    : 'bg-gray-200 dark:bg-gray-800'
                                                    }`}
                                                style={{
                                                    height: `${height}px`,
                                                    animationDelay: conversation.status === 'connected' ? `${(i + 1) * 0.12}s` : '0s'
                                                }}
                                            />
                                        );
                                    })}
                                </div>

                                <div className="flex gap-3">
                                    {conversation.status === 'connected' || conversation.status === 'connecting' ? (
                                        <button
                                            onClick={handleEndCall}
                                            className="flex-1 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors text-red-600 dark:text-red-400 py-2.5 rounded-xl text-sm font-semibold border border-red-200 dark:border-red-500/20 flex items-center justify-center gap-2"
                                        >
                                            <span className="material-icons text-[18px]">call_end</span>
                                            {conversation.status === 'connecting' ? 'Cancel' : 'End Call'}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleStartCall}
                                            className="flex-1 bg-green-50 dark:bg-green-500/10 hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors text-green-700 dark:text-green-400 py-2.5 rounded-xl text-sm font-semibold border border-green-200 dark:border-green-500/20 flex items-center justify-center gap-2"
                                        >
                                            <span className="material-icons text-[18px]">call</span>
                                            Start Call
                                        </button>
                                    )}
                                    {!isSupportTab && (
                                        <button
                                            onClick={() => setShowSettings(true)}
                                            className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white py-2.5 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2"
                                        >
                                            <span className="material-icons text-[18px]">edit</span>
                                            Edit Call Data
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Live Scoring Card */}
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-7 shadow-xl">
                                <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-gray-100 dark:border-gray-800">
                                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                        <span className="material-icons text-gray-900 dark:text-white text-[18px]">analytics</span>
                                    </div>
                                    <h4 className="text-gray-900 dark:text-white text-sm font-bold uppercase tracking-wider">Live Scoring</h4>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                                            <span className="font-medium">Communication</span>
                                            <span className="text-gray-900 dark:text-white font-bold">92/100</span>
                                        </div>
                                        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: '92%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                                            <span className="font-medium">Technical Knowledge</span>
                                            <span className="text-gray-900 dark:text-white font-bold">85/100</span>
                                        </div>
                                        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                                            <div className="bg-gray-900 dark:bg-white h-2 rounded-full transition-all" style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                    <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Detected Skills</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['Agile', 'Jira', 'Product Strategy'].map((skill) => (
                                                <span key={skill} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-xs font-medium rounded-lg">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Right Panel: Chat Conversation ── */}
                        <div className="lg:col-span-3 flex flex-col bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xl h-full lg:min-h-[600px]">
                            {/* Chat Header */}
                            <div className="px-7 py-5 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center shadow-md">
                                        <span className="material-icons text-white dark:text-gray-900 text-[20px]">smart_toy</span>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900 dark:text-white text-sm font-bold">{isSupportTab ? 'SupportCenter AI' : 'VocAIris Agent'}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Powered by ElevenLabs ConvAI</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {conversation.status === 'connected' && (
                                        <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2.5 py-1 rounded-full border border-green-200 dark:border-green-500/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                            Online
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 overflow-y-auto w-full flex flex-col bg-white dark:bg-gray-900">
                                {(conversation.status === 'disconnected' || (showSettings && !isSupportTab)) ? (
                                    isSupportTab ? (
                                        <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500 space-y-4 px-7 py-6">
                                            <span className="material-icons text-4xl opacity-50">mic_none</span>
                                            <p className="text-sm max-w-[250px]">
                                                Click <strong>Start Call</strong> to test the Support AI live in your browser.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex-1 p-7 flex flex-col animate-in fade-in duration-200 h-full">
                                            <div className="mb-6 flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                        <span className="material-icons text-blue-500">api</span>
                                                        Edit Call Data
                                                    </h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Configure the context the agent receives before starting the call.</p>
                                                </div>
                                                {conversation.status !== 'disconnected' && (
                                                    <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors bg-gray-50 dark:bg-gray-800 p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                                        <span className="material-icons text-[20px]">close</span>
                                                    </button>
                                                )}
                                            </div>

                                            <div className="space-y-4 pb-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Candidate Name</label>
                                                    <input type="text" name="name" value={dynamicVariables.name} onChange={handleVariableChange} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Job Details</label>
                                                    <input type="text" name="job_details" value={dynamicVariables.job_details} onChange={handleVariableChange} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Company Provider</label>
                                                        <input type="text" name="company_provider" value={dynamicVariables.company_provider} onChange={handleVariableChange} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Recruiter Email</label>
                                                        <input type="email" name="recruiter_email" value={dynamicVariables.recruiter_email} onChange={handleVariableChange} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                                    </div>
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">User Profile</label>
                                                    <textarea name="user_profile" value={dynamicVariables.user_profile} onChange={handleVariableChange} rows={2} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"></textarea>
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Job Questions</label>
                                                    <textarea name="job_questions" value={dynamicVariables.job_questions} onChange={handleVariableChange} rows={2} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"></textarea>
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Eligibility Questions</label>
                                                    <input type="text" name="eligibility_questions" value={dynamicVariables.eligibility_questions} onChange={handleVariableChange} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 px-7 py-6">
                                        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative">
                                            {conversation.status === 'connecting' ? (
                                                <span className="material-icons text-gray-900 dark:text-white text-[32px] animate-spin">autorenew</span>
                                            ) : (
                                                <span className="material-icons text-gray-900 dark:text-white text-[32px] animate-pulse">record_voice_over</span>
                                            )}

                                            {conversation.isSpeaking && (
                                                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                                {conversation.status === 'connecting' ? 'Connecting to Agent...' :
                                                    conversation.isSpeaking ? 'Agent is speaking...' : 'Listening...'}
                                            </h4>
                                            {conversation.status === 'connected' && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                                                    The agent is talking to you through your speakers/headphones. Please speak into your system microphone to reply.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input Bar */}
                            <div className="px-7 py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex gap-3 items-center mt-auto">
                                <div className="flex-1 bg-gray-50 dark:bg-gray-800 h-11 rounded-xl flex items-center px-4 text-gray-500 dark:text-gray-400 text-sm border border-gray-200 dark:border-gray-700 cursor-not-allowed select-none">
                                    <span className="material-icons mr-2.5 text-[18px]">{conversation.status === 'connected' ? 'lock' : 'info'}</span>
                                    {conversation.status === 'connected' ? 'Voice channel active' : 'Click Start Call when ready'}
                                </div>
                                {!isSupportTab && (
                                    <button onClick={() => setShowSettings(!showSettings)} className="h-11 w-11 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition" title={showSettings ? "Show Call Status" : "Edit Call Data"}>
                                        <span className="material-icons text-[20px]">{showSettings ? 'chat' : 'tune'}</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>

            {/* Captcha Modal */}
            {showCaptchaModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-8 max-w-[360px] w-full border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                <span className="material-icons text-gray-900 dark:text-white text-2xl">shield</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">Security Check</h3>
                        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">Please enter the security code below to start the live demo call.</p>

                        <div className="bg-gray-100 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex items-center justify-center mb-6 select-none relative overflow-hidden group">
                            {/* Noise overlay */}
                            <div className="absolute inset-0 opacity-[0.03] dark:opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
                            {/* Grid overlay */}
                            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                            <span className="font-mono text-4xl font-black tracking-[0.3em] text-gray-800 dark:text-gray-200 relative z-10 translate-x-2 drop-shadow-sm">{captchaCode}</span>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <input
                                    type="text"
                                    value={userInputCaptcha}
                                    onChange={(e) => {
                                        setUserInputCaptcha(e.target.value.toUpperCase());
                                        setCaptchaError(false);
                                    }}
                                    placeholder="Enter 5-digit code"
                                    maxLength={5}
                                    className={`w-full bg-gray-50 dark:bg-gray-800 border ${captchaError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white focus:ring-gray-900 dark:focus:ring-white'} rounded-xl px-4 py-3.5 text-center text-lg font-bold tracking-widest text-gray-900 dark:text-white outline-none transition-all uppercase placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-400`}
                                    onKeyDown={(e) => e.key === 'Enter' && userInputCaptcha.length === 5 && verifyAndStartCall()}
                                    autoFocus
                                />
                                {captchaError && <p className="text-red-500 text-xs font-semibold mt-2.5 text-center flex items-center justify-center gap-1"><span className="material-icons text-[14px]">error</span> Incorrect code, try again.</p>}
                            </div>

                            <div className="flex gap-3 pt-1">
                                <button onClick={() => setShowCaptchaModal(false)} className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3.5 rounded-xl transition-colors text-sm">Cancel</button>
                                <button onClick={verifyAndStartCall} disabled={userInputCaptcha.length !== 5} className="flex-1 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1.5 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)] hover:-translate-y-0.5"><span className="material-icons text-[18px]">verified</span> Verify & Call</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

