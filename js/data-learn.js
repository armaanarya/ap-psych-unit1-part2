/* Learn-mode definition bank. Each item: [answer term, prompt shown to you, extra accepted spellings, hot].
   hot = 1 marks items tied to the teacher's review notes (sleep brain structures, REM body changes,
   sleep paralysis, kinesthesis, vestibular sense). Wrong choices come from other terms in the same group.
   Wording follows Myers' Psychology for AP, 4th edition (Modules 1.5a to 1.6d). */

const LEARN_GROUPS = [
  {
    id: 'con', mod: '1.5a', name: 'Consciousness and dual processing',
    items: [
      ['Consciousness', 'Our subjective awareness of ourselves and our environment.', ['conscious awareness']],
      ['Cognitive neuroscience', 'The interdisciplinary study of the brain activity linked with cognition, including perception, thinking, memory, and language.', ['cognitive neuroscientist']],
      ['Dual processing', 'The principle that information is often processed at the same time on separate conscious and unconscious tracks.', ['dual processing theory', 'dual-processing']],
      ['Blindsight', 'A condition in which a person can respond to a visual stimulus without consciously experiencing it, usually after damage to the visual cortex.', ['blind sight']],
      ['Parallel processing', 'Processing many aspects of a stimulus or problem at the same time. It is the brain\'s natural mode for familiar tasks and runs mostly on the unconscious track.', ['parallel']],
      ['Sequential processing', 'Processing one aspect of a stimulus or problem at a time. We use it for new or complex tasks that need our focused, conscious attention.', ['serial processing', 'sequential']],
      ['Unconscious (automatic) track', 'The "low road" of dual processing: fast, automatic processing that happens outside awareness, such as recognizing a familiar face instantly.', ['unconscious track', 'automatic track', 'unconscious processing', 'automatic processing']],
      ['Conscious (deliberate) track', 'The "high road" of dual processing: slow, effortful, step-by-step reasoning that we are aware of, such as working through a new math problem.', ['conscious track', 'deliberate track', 'conscious processing', 'controlled processing']]
    ]
  },
  {
    id: 'stg', mod: '1.5b', name: 'Sleep stages and brain waves',
    items: [
      ['Sleep', 'A periodic, natural loss of consciousness, as distinct from unconsciousness caused by a coma, general anesthesia, or hibernation.'],
      ['EEG (electroencephalogram)', 'A recording of the electrical waves sweeping across the brain\'s surface, measured by electrodes on the scalp. Sleep researchers use it to identify sleep stages.', ['eeg', 'electroencephalogram']],
      ['Beta waves', 'Fast, low-amplitude brain waves of an alert, active, awake state.', ['beta', 'beta wave']],
      ['Alpha waves', 'The relatively slow brain waves of a relaxed, awake state, such as lying in bed with your eyes closed before you drift off.', ['alpha', 'alpha wave']],
      ['NREM-1 (N1)', 'The brief transition stage from waking into sleep: breathing slows, brain waves become irregular, and you may have hallucinations or hypnagogic sensations.', ['nrem 1', 'n1', 'stage 1', 'nrem1', 'stage one']],
      ['Hallucinations', 'False sensory experiences, such as seeing something in the absence of an external visual stimulus. In sleep they show up mostly in NREM-1.', ['hallucination']],
      ['Hypnagogic sensations', 'Brief, odd experiences as you drift into sleep, such as the feeling of falling or floating, or a sudden body jerk.', ['hypnagogic sensation', 'hypnagogic', 'hypnic jerk', 'hypnic sensations', 'hypnagogic hallucinations']],
      ['NREM-2 (N2)', 'About 20 minutes of light sleep where you are clearly asleep but still fairly easy to wake. Bursts of rapid brain-wave activity called sleep spindles appear. About half of a night is spent here.', ['nrem 2', 'n2', 'stage 2', 'nrem2', 'stage two']],
      ['Sleep spindles', 'Bursts of rapid, rhythmic brain-wave activity that mark NREM-2 sleep and help process memories.', ['sleep spindle', 'spindles']],
      ['NREM-3 (N3)', 'Deep, slow-wave sleep lasting about 30 minutes, when you are hardest to wake. Sleepwalking, night terrors, and growth hormone release happen here.', ['nrem 3', 'n3', 'stage 3', 'nrem3', 'deep sleep', 'slow wave sleep', 'slow-wave sleep', 'stage three']],
      ['Delta waves', 'The large, slow brain waves of deep NREM-3 sleep.', ['delta', 'delta wave']],
      ['REM sleep', 'Rapid eye movement sleep, a recurring stage when vivid dreams usually occur. The heart beats faster and irregularly, breathing turns rapid and irregular, and the muscles are relaxed so the body is nearly paralyzed.', ['rem', 'rapid eye movement sleep', 'rapid eye movement'], 1],
      ['Irregular heartbeat', 'What happens to the heart during REM sleep: it speeds up and beats irregularly, close to waking levels, unlike the slow, steady rhythm of deep NREM-3.', ['irregular heart rate', 'irregular', 'heart rate rises and becomes irregular', 'faster and irregular', 'increases and becomes irregular'], 1],
      ['Paradoxical sleep', 'Another name for REM sleep: the brain is internally aroused with waking-like activity, but the body is nearly paralyzed.', ['paradoxical']],
      ['NREM sleep', 'Non-rapid eye movement sleep: every sleep stage except REM.', ['nrem', 'non rem', 'non-rem sleep', 'non rapid eye movement']],
      ['Sleep cycle', 'The repeating sequence N1, N2, N3, back up through N2, then REM. It takes about 90 minutes in young adults and repeats 4 to 6 times a night.', ['90 minute cycle', 'sleep cycles']],
      ['REM rebound', 'The tendency for REM sleep to increase after REM sleep deprivation. Other mammals show it too, which suggests REM serves a biological need.', ['rem rebound effect']]
    ]
  },
  {
    id: 'clk', mod: '1.5b', name: 'Body clock and sleep in the brain',
    items: [
      ['Circadian rhythm', 'Our biological clock: regular body rhythms (temperature, wakefulness) that occur on a roughly 24-hour cycle.', ['circadian', 'biological clock', 'circadian rhythms']],
      ['Suprachiasmatic nucleus (SCN)', 'A pair of cell clusters in the hypothalamus that controls circadian rhythm. In response to light from the retina, it adjusts melatonin production.', ['suprachiasmatic nucleus', 'scn', 'suprachiasmatic'], 1],
      ['Hypothalamus', 'The brain structure that holds the SCN, the body\'s master clock, and so regulates the sleep-wake cycle.', [], 1],
      ['Pineal gland', 'The gland that releases melatonin into the bloodstream at night, when the SCN quiets down. Light suppresses its output.', ['pineal'], 1],
      ['Melatonin', 'A sleep-inducing hormone. Its level rises in the evening as light fades and drops when morning light hits the retina.', [], 1],
      ['Pituitary gland', 'During deep slow-wave sleep (NREM-3), this gland releases human growth hormone, which the body needs for growth and muscle development.', ['pituitary'], 1],
      ['Growth hormone', 'The hormone the pituitary gland releases mostly during deep (NREM-3) sleep; one reason children need so much sleep.', ['human growth hormone', 'hgh', 'gh'], 1],
      ['Thalamus', 'The sensory relay station. During NREM sleep it gates off most incoming sensory signals so they do not reach the cortex, which helps keep you asleep, and it helps generate sleep spindles.', [], 1],
      ['Brainstem (pons)', 'During REM sleep this region blocks the motor cortex\'s messages to the muscles, which is why the body is nearly paralyzed while the brain is active.', ['brainstem', 'pons', 'brain stem'], 1],
      ['Desynchronization', 'A mismatch between your circadian rhythm and your actual schedule, as in night-shift workers or jet lag. Bright morning light helps reset it.', ['circadian disruption', 'jet lag']]
    ]
  },
  {
    id: 'why', mod: '1.5b', name: 'Why we sleep (6 reasons)',
    items: [
      ['Sleep protects', 'When darkness shut down the day\'s hunting and gathering, our ancestors were safer asleep in a cave, out of harm\'s way. Animals with few places to hide sleep less.', ['protection', 'protects', 'protect']],
      ['Sleep helps us recuperate', 'Sleep restores the immune system, repairs brain tissue and damaged neurons, and clears metabolic waste that builds up while awake.', ['recuperate', 'recuperation', 'restoration', 'restore', 'restores']],
      ['Sleep consolidates memories', 'Sleep restores and rebuilds fading memories of the day\'s experiences, replaying recent learning and strengthening its neural connections.', ['memory', 'memory consolidation', 'consolidates memories', 'consolidation', 'memories']],
      ['Sleep feeds creative thinking', 'After a full night\'s sleep, people solve hard problems more insightfully and spot connections between new pieces of information.', ['creativity', 'creative thinking', 'creative']],
      ['Sleep supports growth', 'During slow-wave sleep the pituitary gland releases growth hormone, which muscle development requires.', ['growth', 'supports growth']],
      ['Sleep conserves energy', 'Sleep keeps us inactive at night, when gathering food would be inefficient, and saves energy for waking hours.', ['energy', 'conserve energy', 'conserves energy']]
    ]
  },
  {
    id: 'los', mod: '1.5c', name: 'Effects of sleep loss',
    items: [
      ['Sleep debt', 'The running deficit that builds after nights of too little sleep. The brain keeps track of it for at least two weeks, and one long night cannot fully repay it.', ['sleep deprivation debt']],
      ['Microsleep', 'A 1- to 6-second lapse into sleep that a very drowsy person does not notice.', ['microsleeps', 'micro sleep']],
      ['Ghrelin increases', 'Sleep loss raises this hunger-arousing hormone, one reason sleep-deprived people gain weight.', ['ghrelin', 'more ghrelin']],
      ['Leptin decreases', 'Sleep loss lowers this hunger-suppressing hormone, so you feel less full.', ['leptin', 'less leptin']],
      ['Cortisol increases', 'Sleep loss raises this stress hormone, which stimulates the body to make fat.', ['cortisol', 'more cortisol']],
      ['Suppressed immune system', 'Sleep loss lowers the number of immune cells that fight viral infections, so people who sleep under 5 hours catch colds far more often.', ['weakened immune system', 'immune suppression', 'immune system']],
      ['Depression risk', 'Teens who sleep 5 hours or less a night show much higher rates of this mood disorder and of suicidal thinking.', ['depression', 'depressed mood']],
      ['Slowed reaction time', 'Sleep loss slows responses and increases errors on visual attention tasks, which raises accident risk. Accidents rise the Monday after the spring clock change.', ['slower reactions', 'reaction time', 'slower reaction time']]
    ]
  },
  {
    id: 'dis', mod: '1.5c', name: 'Sleep disorders',
    items: [
      ['Insomnia', 'Recurring problems falling or staying asleep. Sleeping pills and alcohol can make it worse by reducing REM sleep and building tolerance.', ['insomniac']],
      ['Narcolepsy', 'A disorder of sudden, uncontrollable sleep attacks. The person may lapse directly into REM sleep, often at bad times.', ['narcoleptic']],
      ['Sleep apnea', 'A disorder in which breathing stops temporarily during sleep, causing repeated momentary awakenings the person usually does not remember. Linked to obesity, especially in men.', ['apnea', 'obstructive sleep apnea']],
      ['Sleepwalking (somnambulism)', 'Walking or doing other complex actions during NREM-3 deep sleep; more common in children, runs in families, and usually not remembered.', ['sleepwalking', 'somnambulism', 'sleep walking']],
      ['Sleeptalking', 'Talking during sleep; like sleepwalking it is common in children, runs in families, and the person usually has no memory of it.', ['sleep talking', 'somniloquy']],
      ['Night terrors', 'Episodes of high arousal and an appearance of being terrified (sitting up, screaming, racing heart) during NREM-3, usually within 2 or 3 hours of falling asleep. They are seldom remembered and are most common in children.', ['night terror', 'sleep terrors', 'sleep terror']],
      ['Nightmares', 'Frightening dreams that happen during REM sleep, usually toward morning, and that the person often remembers. Contrast with night terrors.', ['nightmare']],
      ['REM sleep behavior disorder', 'A disorder in which the normal muscle paralysis of REM does not happen, so the person acts out dreams by talking, kicking, or punching.', ['rem behavior disorder', 'rbd', 'rem sleep behaviour disorder']],
      ['Sleep paralysis', 'A REM-sleep problem: the mind wakes up during REM (usually right as you wake from it or slip into it) while REM\'s muscle paralysis is still on, so you are aware but cannot move or speak for seconds to minutes. It often comes with frightening hallucinations, like a presence in the room or pressure on the chest.', ['sleep paralyses'], 1]
    ]
  },
  {
    id: 'drm', mod: '1.5c', name: 'Dreams and dream theories',
    items: [
      ['Dream', 'A sequence of images, emotions, and thoughts passing through a sleeping person\'s mind.', ['dreams', 'dreaming']],
      ['REM dreams', 'Dreams during REM sleep: vivid, emotional, and often bizarre, unlike the vaguer thoughts of NREM sleep.', ['rem dream']],
      ['Information-processing theory', 'Dreams help us sort out the day\'s events and consolidate memories. Support: brain regions active while learning a task reactivate during REM.', ['information processing', 'memory consolidation theory', 'consolidation theory', 'information processing consolidation']],
      ['Physiological function theory', 'Regular brain stimulation from REM sleep may help develop and preserve neural pathways. Support: infants, whose networks are growing fast, spend lots of sleep in REM.', ['physiological function', 'physiological theory', 'neural pathways theory']],
      ['Activation-synthesis theory', 'REM sleep triggers random neural activity spreading up from the brainstem; the brain weaves this "static" into a storyline. Also called the neural activation view.', ['activation synthesis', 'activation-synthesis', 'neural activation', 'neural activation theory']],
      ['Cognitive development theory', 'Dream content reflects the dreamer\'s level of cognitive development, knowledge, and understanding. Young children\'s dreams are more like a slide show than a story.', ['cognitive development', 'cognitive theory']],
      ['Wish-fulfillment theory (Freud)', 'Freud\'s view that dreams are a psychic safety valve that expresses unacceptable feelings. Has little scientific support.', ['wish fulfillment', 'freud', 'freudian', 'wish-fulfillment']],
      ['Manifest content', 'In Freud\'s theory, the remembered storyline of a dream, which he said was a censored, symbolic version of the hidden meaning.', ['manifest']],
      ['Latent content', 'In Freud\'s theory, the underlying, hidden meaning of a dream (its unconscious wishes).', ['latent']],
      ['Amygdala in dreams', 'This limbic structure becomes more active during emotional dreams, while frontal-lobe areas for logic and inhibition idle.', ['amygdala', 'limbic system']]
    ]
  },
  {
    id: 'thr', mod: '1.6a', name: 'Sensation, perception, thresholds',
    items: [
      ['Sensation', 'The process by which our sensory receptors and nervous system receive and represent stimulus energies from the environment.', ['sensing']],
      ['Perception', 'The process of organizing and interpreting sensory information, enabling us to recognize meaningful objects and events.', ['perceiving']],
      ['Transduction', 'Converting one form of energy into another; in sensation, turning physical energy such as light or sound into neural impulses.', ['transduce']],
      ['Psychophysics', 'The study of relationships between the physical characteristics of stimuli, such as their intensity, and our psychological experience of them.', ['psycho physics']],
      ['Absolute threshold', 'The minimum stimulation needed to detect a particular stimulus 50 percent of the time.', ['absolute thresholds']],
      ['Signal detection theory', 'A theory predicting how and when we detect a faint stimulus (signal) amid background stimulation (noise). It says there is no single absolute threshold; detection also depends on experience, expectations, motivation, and alertness.', ['signal detection', 'sdt']],
      ['False alarm', 'In signal detection theory, saying a signal is present when it is not.', ['false alarms', 'false positive']],
      ['Miss', 'In signal detection theory, failing to detect a signal that is present.', ['misses', 'false negative']],
      ['Subliminal stimuli', 'Stimuli below one\'s absolute threshold for conscious awareness. They can briefly prime responses but do not produce lasting persuasion.', ['subliminal', 'subliminal stimulus', 'subliminal stimulation']],
      ['Priming', 'The activation, often unconsciously, of certain associations, which predisposes your perception, memory, or response.', ['primed']],
      ['Difference threshold', 'The minimum difference between two stimuli required for detection 50 percent of the time. Also called the just noticeable difference.', ['just noticeable difference', 'jnd', 'difference thresholds']],
      ['Weber\'s law', 'The principle that to be perceived as different, two stimuli must differ by a constant minimum percentage, not a constant amount.', ['webers law', 'weber law', 'weber']],
      ['Sensory adaptation', 'Diminished sensitivity as a consequence of constant stimulation, such as no longer noticing the smell of your own house.', ['adaptation', 'sensory adaption']]
    ]
  },
  {
    id: 'vis', mod: '1.6b', name: 'Vision: light and the eye',
    items: [
      ['Wavelength', 'The distance from the peak of one light or sound wave to the peak of the next. For light it determines hue (color).', ['wave length']],
      ['Hue', 'The dimension of color determined by the wavelength of light; what we know as the color names blue, green, red, and so on.', ['color']],
      ['Intensity (amplitude)', 'The amount of energy in a light wave, set by the wave\'s height. For light it determines brightness.', ['intensity', 'amplitude', 'brightness']],
      ['Cornea', 'The clear outer covering of the eye that protects it and bends light to provide focus.'],
      ['Pupil', 'The adjustable opening in the center of the eye through which light enters.'],
      ['Iris', 'A ring of muscle tissue that forms the colored part of the eye around the pupil and controls the size of the pupil opening.'],
      ['Lens', 'The transparent structure behind the pupil that changes shape to help focus images on the retina.'],
      ['Accommodation', 'The process by which the eye\'s lens changes shape to focus near or far objects on the retina.'],
      ['Retina', 'The light-sensitive back inner surface of the eye, containing the rods and cones plus layers of neurons that begin processing visual information.'],
      ['Rods', 'Retinal receptors that detect black, white, and gray and are sensitive to movement. They are needed for peripheral and twilight vision.', ['rod']],
      ['Cones', 'Retinal receptors concentrated near the center of the retina that work in daylight or well-lit conditions. They detect fine detail and give rise to color.', ['cone']],
      ['Fovea', 'The central focal point in the retina, around which the eye\'s cones cluster.'],
      ['Bipolar cells', 'Retinal neurons that receive signals from rods and cones and pass them to ganglion cells.', ['bipolar cell', 'bipolar']],
      ['Ganglion cells', 'Retinal neurons whose axons bundle together to form the optic nerve.', ['ganglion cell', 'ganglion']],
      ['Optic nerve', 'The nerve that carries neural impulses from the eye to the brain.'],
      ['Blind spot', 'The point where the optic nerve leaves the eye. It has no receptor cells, so it creates a small gap in vision.', ['optic disc']]
    ]
  },
  {
    id: 'vbr', mod: '1.6b', name: 'Vision: eye to brain and color',
    items: [
      ['Optic chiasm', 'The X-shaped point where the optic nerves partly cross, so information from the left visual field goes to the right hemisphere and the right visual field goes to the left hemisphere.', ['optic chiasma', 'chiasm']],
      ['Thalamus (vision)', 'After the optic chiasm, visual signals stop at this relay center before going on to the visual cortex.', ['thalamus', 'lateral geniculate nucleus', 'lgn']],
      ['Visual cortex (occipital lobe)', 'The final stop of the visual pathway, at the back of the brain, where feature detectors analyze the image.', ['visual cortex', 'occipital lobe', 'occipital', 'primary visual cortex']],
      ['Young-Helmholtz trichromatic theory', 'The theory that the retina contains three kinds of color receptors, most sensitive to red, green, or blue, which in combination produce the perception of any color.', ['trichromatic theory', 'trichromatic', 'young helmholtz', 'young-helmholtz', 'three color theory']],
      ['Opponent-process theory', 'The theory that opposing retinal processes (red-green, blue-yellow, white-black) enable color vision. It explains afterimages.', ['opponent process', 'opponent process theory', 'opponent-process']],
      ['Afterimage', 'After staring at a green, black, and yellow flag, a white wall shows a red, white, and blue one, because the fatigued half of each opponent pair rebounds.', ['afterimages', 'negative afterimage']],
      ['Color blindness (dichromatic vision)', 'Missing red- or green-sensitive cones, so red and green are hard to tell apart; best explained by the trichromatic theory.', ['color blindness', 'colorblindness', 'dichromatic', 'color deficiency']],
      ['Feature detectors', 'Nerve cells in the brain\'s visual cortex that respond to specific features of a stimulus, such as shape, angle, or movement. Discovered by Hubel and Wiesel.', ['feature detector', 'hubel and wiesel']],
      ['Fusiform face area', 'A region on the underside of the temporal lobe specialized for recognizing faces. Damage can cause prosopagnosia (face blindness).', ['ffa', 'fusiform gyrus', 'fusiform']],
      ['Prosopagnosia', 'Face blindness: an inability to recognize familiar faces, even though other objects are recognized, often after fusiform face area damage.', ['face blindness']],
      ['Parallel processing (vision)', 'The brain\'s habit of analyzing several parts of a scene at once, splitting it into color, motion, form, and depth, then putting them back together.', ['parallel processing', 'parallel']]
    ]
  },
  {
    id: 'aud', mod: '1.6c', name: 'Hearing',
    items: [
      ['Audition', 'The sense or act of hearing.', ['hearing']],
      ['Frequency', 'The number of complete wavelengths that pass a point in a given time. For sound it determines pitch.', ['hertz', 'hz']],
      ['Pitch', 'A tone\'s experienced highness or lowness, which depends on frequency. Short wavelengths mean high frequency and high pitch.'],
      ['Amplitude (loudness)', 'The height of a sound wave, which determines how loud it sounds. Loudness is measured in decibels.', ['amplitude', 'loudness', 'decibels', 'decibel']],
      ['Outer ear', 'The pinna (the visible ear) and the auditory canal, which channel sound waves to the eardrum.', ['pinna', 'auditory canal', 'ear canal']],
      ['Eardrum (tympanic membrane)', 'The tight membrane at the end of the auditory canal that vibrates with sound waves.', ['eardrum', 'tympanic membrane', 'ear drum']],
      ['Middle ear', 'The chamber between the eardrum and cochlea containing three tiny bones (hammer, anvil, and stirrup) that concentrate the eardrum\'s vibrations on the cochlea\'s oval window.', ['ossicles', 'hammer anvil stirrup']],
      ['Oval window', 'The membrane-covered opening of the cochlea that the stirrup pushes against, sending ripples through the cochlear fluid.'],
      ['Cochlea', 'A coiled, bony, fluid-filled tube in the inner ear; sound waves traveling through its fluid trigger nerve impulses.'],
      ['Inner ear', 'The innermost part of the ear, containing the cochlea, semicircular canals, and vestibular sacs.'],
      ['Basilar membrane and hair cells', 'Inside the cochlea, ripples bend the hair cells lining this membrane, which triggers impulses in the auditory nerve.', ['hair cells', 'basilar membrane', 'hair cell']],
      ['Auditory nerve', 'Carries neural messages from the cochlea through the thalamus to the auditory cortex in the temporal lobe.', ['auditory nerves', 'cochlear nerve']],
      ['Auditory cortex (temporal lobe)', 'Where sound signals end up and are interpreted, after the auditory nerve and the thalamus.', ['auditory cortex', 'temporal lobe', 'temporal']],
      ['Sensorineural hearing loss', 'The most common hearing loss, caused by damage to the cochlea\'s hair cells or the auditory nerve. Also called nerve deafness; loud noise and aging cause it.', ['sensorineural', 'nerve deafness']],
      ['Conduction hearing loss', 'A less common hearing loss caused by damage to the mechanical system that conducts sound waves to the cochlea, such as a punctured eardrum or damaged middle-ear bones.', ['conduction', 'conductive hearing loss', 'conductive']],
      ['Cochlear implant', 'A device that converts sounds into electrical signals and stimulates the auditory nerve through electrodes threaded into the cochlea.', ['cochlear implants']],
      ['Place theory', 'In hearing, the theory that links the pitch we hear with the place where the cochlea\'s membrane is stimulated. It best explains high pitches.', ['place']],
      ['Frequency theory', 'In hearing, the theory that the rate of nerve impulses traveling up the auditory nerve matches a tone\'s frequency. It best explains low pitches. Also called temporal theory.', ['temporal theory', 'frequency']],
      ['Volley principle', 'Neural cells taking turns firing so their combined rate can match sound frequencies above 1,000 waves per second, which a single neuron cannot.', ['volley']],
      ['Sound localization', 'Locating a sound by the slight differences in when it reaches each ear and how loud it is in each ear.', ['locating sounds', 'localization', 'sound localisation']]
    ]
  },
  {
    id: 'oth', mod: '1.6d', name: 'Touch, pain, taste, smell',
    items: [
      ['Bottom-up processing', 'Analysis that begins with the sensory receptors and works up to the brain\'s integration of sensory information.', ['bottom up', 'bottom-up']],
      ['Top-down processing', 'Information processing guided by higher-level mental processes, as when we construct perceptions drawing on our experience and expectations.', ['top down', 'top-down']],
      ['Biopsychosocial approach (pain)', 'Viewing pain as the product of biological factors (nerve signals), psychological factors (attention, expectations), and social-cultural factors (presence of others, cultural norms).', ['biopsychosocial', 'biopsychosocial model', 'biopsychosocial approach']],
      ['Four skin senses', 'Touch is a mix of pressure, warmth, cold, and pain.', ['pressure warmth cold pain', 'skin senses', 'touch']],
      ['Nociceptors', 'Sensory receptors that respond to potentially damaging stimuli by sending a pain impulse to the spinal cord, which passes it to the brain.', ['nociceptor', 'pain receptors']],
      ['Pain circuit', 'Nociceptors send signals up small nerve fibers to the spinal cord, which passes them through the thalamus to the cortex, where pain is felt.', ['pain pathway']],
      ['Gate-control theory', 'The theory that the spinal cord contains a neurological "gate" that blocks pain signals or lets them pass to the brain. Small-fiber activity opens it; large-fiber activity (rubbing) or messages from the brain close it.', ['gate control', 'gate control theory', 'gate-control']],
      ['Endorphins', 'The body\'s natural painkillers, released during stress or exercise, that help close the pain gate.', ['endorphin']],
      ['Phantom limb sensation', 'Feeling pain or movement in a limb that has been amputated, showing that the brain can create pain without input from the body.', ['phantom limb', 'phantom limb pain']],
      ['Placebo (pain)', 'An inactive treatment that reduces pain because the person expects relief; the expectation can trigger the brain to release endorphins.', ['placebo', 'placebo effect']],
      ['Distraction (pain)', 'Drawing attention away from pain, such as a nurse chatting during a shot, which reduces how much pain is felt.', ['distraction']],
      ['Gustation', 'The sense of taste. Taste receptor cells in the taste buds detect chemicals and are replaced every week or two.', ['taste']],
      ['Six basic tastes', 'Sweet, salty, sour, bitter, umami, and oleogustus (the taste of fat).', ['sweet salty sour bitter umami oleogustus', 'basic tastes', '6 basic tastes']],
      ['Umami', 'A savory, meaty taste that signals protein, as in MSG and broth.'],
      ['Oleogustus', 'The taste of fat, the newest of the basic tastes.', ['fat taste', 'fat']],
      ['Olfaction', 'The sense of smell. Receptor cells high in the nasal cavity send messages to the olfactory bulb.', ['smell']],
      ['Smell, emotion, and memory', 'Smell signals skip the thalamus and go straight to the olfactory cortex and the limbic system (amygdala and hippocampus), so odors can trigger strong emotions and memories.', ['smell and memory', 'olfaction memory', 'smell memory']],
      ['Kinesthesis', 'Our movement sense: the system for sensing the position and movement of individual body parts, using receptors in the muscles, tendons, and joints.', ['kinesthetic sense', 'kinaesthesis', 'kinesthesia', 'kinesthetic', 'proprioception'], 1],
      ['Vestibular sense', 'Our balance sense: it monitors head and body position and movement using fluid-filled semicircular canals and vestibular sacs in the inner ear.', ['vestibular', 'vestibular system', 'balance'], 1],
      ['Semicircular canals', 'Three fluid-filled, pretzel-shaped loops in the inner ear. When your head turns or tilts, the fluid moves and bends hair-like receptors that signal the brain about balance.', ['semicircular canal'], 1],
      ['Sensory interaction', 'The principle that one sense may influence another, as when the smell of food influences its taste, or seeing lips move changes what we hear (McGurk effect).', ['sensory integration', 'mcgurk effect']],
      ['Embodied cognition', 'The influence of bodily sensations, gestures, and other states on cognitive preferences and judgments, such as holding a warm drink and judging a stranger as warmer.', ['embodied']],
      ['Synesthesia', 'A condition in which one sort of sensation (such as hearing a sound) produces another (such as seeing a color).', ['synaesthesia', 'synesthete']]
    ]
  }
];
