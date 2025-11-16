'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target,
  Eye,
  Heart,
  Globe,
  Users,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const visionPoints = [
  {
    icon: Globe,
    title: 'Global Accessibility',
    description: 'Make Quranic understanding accessible to every Muslim, regardless of location, language, or background.',
  },
  {
    icon: Users,
    title: 'Community Building',
    description: 'Create a worldwide community of Quran learners united by understanding and reflection.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation in Education',
    description: 'Lead the transformation of Islamic education through innovative, student-centric methodologies.',
  },
  {
    icon: Heart,
    title: 'Spiritual Connection',
    description: 'Foster deep, personal relationships between believers and the divine message of Allah.',
  },
];

const missions = [
  {
    icon: BookOpen,
    title: 'Simplify Learning',
    description: 'Break down complex Arabic grammar into simple, digestible word-for-word translations that anyone can master.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Free Education',
    description: 'Provide completely free, high-quality Quran education to remove financial barriers to knowledge.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Target,
    title: 'Comprehensive Curriculum',
    description: 'Develop systematic courses covering complete Juz-by-Juz translation with structured learning paths.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Globe,
    title: 'Digital Platform',
    description: 'Leverage technology to reach millions through online classes, videos, and interactive learning tools.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Improvement',
    description: 'Constantly evolve our teaching methods based on student feedback and educational research.',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Maintain highest standards of authenticity, accuracy, and scholarly integrity in all materials.',
    color: 'from-indigo-500 to-purple-500',
  },
];

const values = [
  'Sincerity (Ikhlas) - Teaching purely for Allah\'s pleasure',
  'Excellence (Ihsan) - Delivering the best quality education',
  'Accessibility - Making knowledge free and available to all',
  'Authenticity - Staying true to classical Islamic scholarship',
  'Innovation - Embracing modern tools while honoring tradition',
  'Community - Building supportive learning networks',
  'Patience - Understanding that learning is a journey',
  'Gratitude - Appreciating the blessing of Quranic knowledge',
];

const milestones = [
  { year: '2025', goal: 'Reach 100,000 active students globally' },
  { year: '2026', goal: 'Complete translation courses for all 30 Juz' },
  { year: '2027', goal: 'Launch mobile app with offline learning' },
  { year: '2028', goal: 'Establish physical learning centers in 10 countries' },
  { year: '2030', goal: 'Impact 1 million lives with Quranic understanding' },
];

const impact = [
  { number: '50,000+', label: 'Students Enrolled', icon: Users },
  { number: '25+', label: 'Countries Reached', icon: Globe },
  { number: '500+', label: 'Classes Conducted', icon: BookOpen },
  { number: '100%', label: 'Free Education', icon: Heart },
];

export default function VisionMissionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf9f7] to-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto space-y-6"
          >
            <Badge className="mb-4 bg-[#453142] text-[#faf9f7] px-4 py-2">
              Our Direction
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-[#453142] leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Vision</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Mission</span>
            </h1>
            
            <p className="text-xl text-[#453142]/80 leading-relaxed">
              Empowering millions to understand and live by the Quran through innovative education and unwavering commitment to accessibility
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      {/* <section className="py-16 bg-gradient-to-br from-[#453142] to-purple-900 text-white -mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {impact.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <p className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</p>
                <p className="text-white/80 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Vision Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Eye className="w-16 h-16 mx-auto mb-4 text-purple-600" />
            <Badge className="mb-4 bg-purple-100 text-purple-700">Our Vision</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-[#453142] mb-4">
              A World Where Every Muslim Understands the Quran
            </h2>
            <p className="text-xl text-[#453142]/70 max-w-3xl mx-auto">
              We envision a global community where understanding the Quran is not a privilege but a reality for every Muslim, transforming lives through divine wisdom
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            {visionPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <point.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#453142] mb-2">{point.title}</h3>
                        <p className="text-[#453142]/70">{point.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#faf9f7] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Target className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <Badge className="mb-4 bg-blue-100 text-blue-700">Our Mission</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-[#453142] mb-4">
              How We're Making It Happen
            </h2>
            <p className="text-xl text-[#453142]/70 max-w-3xl mx-auto">
              Strategic initiatives driving our vision into reality, one student at a time
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {missions.map((mission, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${mission.color}`} />
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${mission.color} rounded-xl flex items-center justify-center mb-4`}>
                      <mission.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#453142] mb-2">{mission.title}</h3>
                    <p className="text-[#453142]/70 leading-relaxed">{mission.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-orange-600" />
            <Badge className="mb-4 bg-orange-100 text-orange-700">Core Values</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-[#453142] mb-4">
              Principles That Guide Us
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 bg-gradient-to-r from-[#faf9f7] to-white p-4 rounded-lg border border-[#453142]/10 hover:border-[#453142]/30 transition-colors"
                >
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <span className="text-[#453142] font-medium">{value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#faf9f7] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <TrendingUp className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <Badge className="mb-4 bg-green-100 text-green-700">Roadmap</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-[#453142] mb-4">
              Our Journey Ahead
            </h2>
            <p className="text-xl text-[#453142]/70 max-w-3xl mx-auto">
              Ambitious goals driving us toward a future where Quranic understanding is universal
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 pb-10 border-l-4 border-[#453142]/20 last:pb-0"
              >
                <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#453142] to-purple-600 flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>

                <Card className="ml-8 border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <Badge className="mb-2 bg-purple-100 text-purple-700">{milestone.year}</Badge>
                        <p className="text-lg font-semibold text-[#453142]">{milestone.goal}</p>
                      </div>
                      <ArrowRight className="h-6 w-6 text-[#453142]/40" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#453142] to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <Heart className="w-16 h-16 mx-auto text-white/80" />
            <h2 className="text-3xl md:text-5xl font-bold">
              Be Part of This Global Movement
            </h2>
            <p className="text-xl text-white/80">
              Join thousands of students worldwide in making Quranic understanding a reality for all
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#453142] hover:bg-gray-100">
                Start Learning Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Support Our Mission
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
