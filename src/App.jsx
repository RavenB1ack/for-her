import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const phrases = [
  'Мне нравится случайно находить твои сообщения среди дня.',
  'После разговоров с тобой у меня почему-то всегда становится спокойнее.',
  'И в какой-то момент ты стала значить для меня намного больше, чем просто человек.',
];

const finalLines = [
  'Я долго думал, как сказать это правильно.',
  'Но понял, что больше не хочу прятать это за намёками.',
  'Ты стала для меня очень особенным человеком.',
  'И мне хочется быть рядом с тобой уже не как “просто кто-то”.',
];

const createParticles = () =>
  Array.from({ length: 64 }, (_, index) => {
    const seed = index + 1;
    return {
      id: seed,
      top: (seed * 37) % 100,
      left: (seed * 53) % 100,
      size: seed % 7 === 0 ? 3 : seed % 3 === 0 ? 2 : 1,
      duration: 5 + (seed % 9) * 0.55,
      delay: (seed % 11) * 0.28,
      drift: seed % 2 === 0 ? 18 : -18,
    };
  });

const blurReveal = {
  hidden: { opacity: 0, y: 24, filter: 'blur(16px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -16, filter: 'blur(10px)' },
};

function AmbientParticles() {
  const shouldReduceMotion = useReducedMotion();
  const particles = useMemo(() => createParticles(), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -left-32 top-[-18%] h-[26rem] w-[26rem] rounded-full bg-rose-200/10 blur-3xl sm:h-[38rem] sm:w-[38rem]"
        animate={shouldReduceMotion ? undefined : { opacity: [0.18, 0.34, 0.18], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-22%] right-[-38%] h-[34rem] w-[34rem] rounded-full bg-violet-200/10 blur-3xl sm:right-[-14%] sm:h-[44rem] sm:w-[44rem]"
        animate={shouldReduceMotion ? undefined : { opacity: [0.16, 0.3, 0.16], scale: [1.06, 1, 1.06] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute left-1/2 top-1/2 h-[68vmax] w-[68vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.065),transparent_60%)] blur-2xl" />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.75)]"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.25 }
              : {
                  opacity: [0.05, 0.7, 0.08],
                  y: [0, particle.drift, 0],
                  x: [0, particle.drift / 3, 0],
                }
          }
          transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(0,0,0,0.42)_58%,rgba(0,0,0,0.95)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55),transparent_30%,rgba(0,0,0,0.72))]" />
    </div>
  );
}

function Intro() {
  return (
    <motion.header
      className="mx-auto max-w-3xl text-center"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.18 } } }}
    >
      <motion.p
        variants={blurReveal}
        transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
        className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.52em] text-white/35 sm:mb-7"
      >
        for you
      </motion.p>
      <motion.h1
        variants={blurReveal}
        transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-[clamp(2.85rem,12vw,7.4rem)] font-light leading-[0.88] tracking-[-0.065em] text-balance"
      >
        Я хотел сказать тебе
        <span className="mt-3 block bg-gradient-to-b from-white via-white/75 to-white/42 bg-clip-text pb-2 text-transparent">
          кое-что важное.
        </span>
      </motion.h1>
    </motion.header>
  );
}

function PhraseSequence({ stage }) {
  return (
    <section className="mx-auto mt-12 flex min-h-[15.5rem] w-full max-w-3xl flex-col items-center justify-center gap-6 text-center sm:mt-16 sm:min-h-[17rem] sm:gap-8">
      {phrases.map((phrase, index) => (
        <AnimatePresence key={phrase} mode="wait">
          {stage >= index + 1 && (
            <motion.p
              variants={blurReveal}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 1.35 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-balance text-lg font-light leading-relaxed tracking-[-0.01em] text-white/70 sm:text-2xl"
              style={{ opacity: 0.82 - index * 0.12 }}
            >
              {phrase}
            </motion.p>
          )}
        </AnimatePresence>
      ))}
    </section>
  );
}

function FinalCard() {
  const [answer, setAnswer] = useState('');

  return (
    <motion.section
      initial={{ opacity: 0, y: 56, scale: 0.96, filter: 'blur(18px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 24, filter: 'blur(14px)' }}
      transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-8 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.075] p-6 text-center shadow-card backdrop-blur-2xl sm:mt-12 sm:rounded-[2.75rem] sm:p-12 md:p-14"
    >
      <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
      <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      <div className="relative space-y-5 text-base font-light leading-relaxed text-white/78 sm:text-xl sm:leading-relaxed">
        {finalLines.map((line, index) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.35 + index * 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, delay: 1.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-10 sm:mt-14"
      >
        <p className="mb-4 text-[0.65rem] uppercase tracking-[0.42em] text-white/30">the question</p>
        <h2 className="font-display text-[clamp(2.8rem,12vw,6.5rem)] font-light leading-[0.9] tracking-[-0.06em] text-white">
          Ты будешь
          <span className="block text-white/78">моей девушкой?</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-9 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:justify-center sm:gap-4"
      >
        <button
          className="group relative min-h-14 overflow-hidden rounded-2xl bg-white px-10 py-4 text-base font-medium text-black shadow-glow transition duration-300 ease-cinematic hover:-translate-y-0.5 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.99]"
          onClick={() => setAnswer('Я знал. И всё равно сердце замерло.')}
        >
          <span className="relative z-10">Да</span>
          <span className="absolute inset-0 translate-y-full bg-gradient-to-t from-rose-100 to-white transition duration-300 ease-cinematic group-hover:translate-y-0" />
        </button>
        <button
          className="min-h-14 rounded-2xl border border-white/15 bg-white/[0.07] px-10 py-4 text-base font-medium text-white/85 backdrop-blur-md transition duration-300 ease-cinematic hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white/25 hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/45 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.99]"
          onClick={() => setAnswer('Тогда это мой любимый момент.')}
        >
          Конечно да
        </button>
      </motion.div>

      <AnimatePresence>
        {answer && (
          <motion.p
            initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-6 text-sm text-white/55 sm:text-base"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default function App() {
  const [stage, setStage] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setStage(3);
      setShowFinal(true);
      return undefined;
    }

    const timers = [
      setTimeout(() => setStage(1), 2200),
      setTimeout(() => setStage(2), 5000),
      setTimeout(() => setStage(3), 7800),
      setTimeout(() => setShowFinal(true), 10600),
    ];

    return () => timers.forEach(clearTimeout);
  }, [shouldReduceMotion]);

  return (
    <main className="relative isolate flex min-h-svh overflow-hidden bg-[#030305] px-5 py-[max(3.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] text-white sm:px-8">
      <AmbientParticles />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,#030305_0%,#100d12_42%,#050507_100%)]" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-5xl flex-col items-center justify-center">
        <Intro />
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 h-px w-28 origin-center bg-gradient-to-r from-transparent via-white/45 to-transparent sm:mt-12"
        />
        <PhraseSequence stage={stage} />
        <AnimatePresence>{showFinal && <FinalCard />}</AnimatePresence>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: shouldReduceMotion ? 0.4 : 4.8 }}
          className="mt-9 text-center text-[0.65rem] uppercase tracking-[0.42em] text-white/20 sm:mt-12"
        >
          made with feelings
        </motion.p>
      </div>
    </main>
  );
}
