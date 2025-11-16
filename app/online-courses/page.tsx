'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  Users,
  Phone,
  CheckCircle2,
  Loader2,
  X,
  Info,
  Sparkles,
  Globe,
} from 'lucide-react';
import type { ClassSchedule, ClassRegistration } from '@/types/class';

const ongoingClasses: ClassSchedule[] = [
  {
    id: 'ongoing-tamil-1',
    language: 'Tamil',
    classType: 'ongoing',
    timing: '6am To 7am',
    days: 'Monday To Thursday',
    contactNumber: '+91 9941276649',
    timezone: 'IST',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'ongoing-tamil-2',
    language: 'Tamil',
    classType: 'ongoing',
    timing: '11:30am To 12:30pm',
    days: 'Monday To Thursday',
    contactNumber: '+91 9941276649',
    timezone: 'IST',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'ongoing-tamil-3',
    language: 'Tamil',
    classType: 'ongoing',
    timing: '3pm To 4pm',
    days: 'Monday To Thursday',
    contactNumber: '+91 9941276649',
    timezone: 'IST',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'ongoing-tamil-4',
    language: 'Tamil',
    classType: 'ongoing',
    timing: '7pm To 8pm',
    days: 'Monday To Thursday',
    contactNumber: '+91 9941276649',
    timezone: 'IST',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'ongoing-english-urdu-1',
    language: 'English & Urdu',
    classType: 'ongoing',
    timing: '6am To 7am',
    days: 'Monday To Thursday',
    contactNumber: '+91 98842 22484',
    timezone: 'IST',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'ongoing-english-urdu-2',
    language: 'English & Urdu',
    classType: 'ongoing',
    timing: '11:30am To 12:20pm',
    days: 'Monday To Thursday',
    contactNumber: '+91 98842 22484',
    timezone: 'IST',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'ongoing-english-us',
    language: 'English (U.S)',
    classType: 'ongoing',
    timing: '7:45 am To 8:30 am',
    days: 'Tuesday to Friday',
    contactNumber: '+91 98401 32100',
    timezone: 'IST',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'ongoing-english-australia',
    language: 'English (Australia)',
    classType: 'ongoing',
    timing: '6:30 am To 7:30 am',
    days: 'Saturday & Sunday',
    contactNumber: '+91 94444 33969',
    timezone: 'IST',
    color: 'from-green-500 to-emerald-600',
  },
];

const upcomingClasses: ClassSchedule[] = [
  {
    id: 'upcoming-urdu-english',
    language: 'Urdu and English',
    classType: 'upcoming',
    timing: '3pm To 3:50pm',
    days: 'Monday To Thursday',
    contactNumber: '+91 98414 09389',
    timezone: 'IST',
    startDate: '17th April 2024',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'upcoming-english',
    language: 'English',
    classType: 'upcoming',
    timing: '7pm To 7:50pm',
    days: 'Monday To Thursday',
    contactNumber: '+91 98400 59455',
    timezone: 'IST',
    startDate: '17th April 2024',
    color: 'from-teal-500 to-cyan-600',
  },
];

export default function OnlineCoursesPage() {
  const [selectedClass, setSelectedClass] = useState<ClassSchedule | null>(null);
  const [formData, setFormData] = useState<Partial<ClassRegistration>>({
    country: 'India',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClassSelect = (classItem: ClassSchedule) => {
    setSelectedClass(classItem);
    setFormData({
      ...formData,
      language: classItem.language,
      classType: classItem.classType,
      timing: classItem.timing,
      days: classItem.days,
      contactNumber: classItem.contactNumber,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/class-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setSelectedClass(null);
          setFormData({ country: 'India' });
          setIsSuccess(false);
        }, 3000);
      } else {
        alert(data.msg || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf9f7] to-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto space-y-6"
          >
            <Badge className="mb-4 bg-[#453142] text-[#faf9f7] px-4 py-2">
              <Users className="inline h-4 w-4 mr-2" />
              Ladies Classes
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-[#453142] leading-tight">
              Online WQTC{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                Ladies Classes
              </span>
            </h1>

            <p className="text-xl text-[#453142]/80 leading-relaxed">
              For Ladies, By Ladies - Join our exclusive online Quran translation classes in multiple languages
            </p>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Badge className="bg-green-100 text-green-700 px-4 py-2">
                <Sparkles className="inline h-4 w-4 mr-2" />
                NO FEES - 100% FREE
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 px-4 py-2">
                <Globe className="inline h-4 w-4 mr-2" />
                Multiple Languages
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Info className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-[#453142] mb-2">
                      Important: Only Commitment Required!
                    </h3>
                    <p className="text-[#453142]/80">
                      ✅ <strong>NO FEES</strong> - Completely Free Classes
                      <br />
                      📱 <strong>WhatsApp Only</strong> - Contact via WhatsApp message after registration
                      <br />
                      💪 <strong>Commitment</strong> - Regular attendance and dedication expected
                      <br />
                      👩‍🎓 <strong>Ladies Only</strong> - Taught by female instructors
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Ongoing Classes */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700">Ongoing Classes</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-[#453142] mb-4">
              Join Our Active Classes
            </h2>
            <p className="text-[#453142]/70 text-lg max-w-2xl mx-auto">
              Click on any class to register instantly
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {ongoingClasses.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <Card
                  className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
                  onClick={() => handleClassSelect(classItem)}
                >
                  <div className={`h-2 bg-gradient-to-r ${classItem.color}`} />
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#453142] mb-2 group-hover:text-purple-600 transition-colors">
                        {classItem.language}
                      </h3>
                      <Badge className="bg-[#453142]/10 text-[#453142]">
                        {classItem.days}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-[#453142]/70">
                        <Clock className="h-4 w-4" />
                        <span>{classItem.timing} {classItem.timezone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#453142]/70">
                        <Phone className="h-4 w-4" />
                        <span className="font-mono">{classItem.contactNumber}</span>
                      </div>
                    </div>

                    <Button
                      className={`w-full bg-gradient-to-r ${classItem.color} text-white hover:opacity-90`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClassSelect(classItem);
                      }}
                    >
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Classes */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#faf9f7] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-orange-100 text-orange-700">
              Starting Soon - Insha Allah
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-[#453142] mb-4">
              Upcoming Classes from 17th April 2024
            </h2>
            <p className="text-[#453142]/70 text-lg max-w-2xl mx-auto">
              Register early to secure your spot
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {upcomingClasses.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card
                  className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
                  onClick={() => handleClassSelect(classItem)}
                >
                  <div className={`h-2 bg-gradient-to-r ${classItem.color}`} />
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-[#453142] mb-2 group-hover:text-orange-600 transition-colors">
                          {classItem.language}
                        </h3>
                        <Badge className="bg-orange-100 text-orange-700">
                          Starts: {classItem.startDate}
                        </Badge>
                      </div>
                      <Calendar className="h-6 w-6 text-orange-500" />
                    </div>

                    <div>
                      <Badge className="bg-[#453142]/10 text-[#453142]">
                        {classItem.days}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-[#453142]/70">
                        <Clock className="h-4 w-4" />
                        <span>{classItem.timing} {classItem.timezone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#453142]/70">
                        <Phone className="h-4 w-4" />
                        <span className="font-mono">{classItem.contactNumber}</span>
                      </div>
                    </div>

                    <Button
                      className={`w-full bg-gradient-to-r ${classItem.color} text-white hover:opacity-90`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClassSelect(classItem);
                      }}
                    >
                      Pre-Register Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {selectedClass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
            onClick={() => !isSubmitting && setSelectedClass(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-[#453142]/20 p-6 flex justify-between items-start z-10">
                <div>
                  <h2 className="text-2xl font-bold text-[#453142]">Register for Class</h2>
                  <p className="text-[#453142]/70 mt-1">
                    {selectedClass.language} - {selectedClass.timing}
                  </p>
                </div>
                <button
                  onClick={() => !isSubmitting && setSelectedClass(null)}
                  disabled={isSubmitting}
                  className="text-[#453142] hover:bg-[#453142]/10 rounded-full p-2 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-600 mb-2">
                      Registration Successful!
                    </h3>
                    <p className="text-[#453142]/70 mb-4">
                      You will be contacted on WhatsApp at{' '}
                      <strong>{selectedClass.contactNumber}</strong>
                    </p>
                    <Badge className="bg-purple-100 text-purple-700">
                      Check your WhatsApp for confirmation
                    </Badge>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Class Details (Read-only) */}
                    <Card className={`border-0 bg-gradient-to-r ${selectedClass.color} text-white`}>
                      <CardContent className="p-4 space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span><strong>Days:</strong> {selectedClass.days}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span><strong>Time:</strong> {selectedClass.timing} {selectedClass.timezone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span><strong>Contact:</strong> {selectedClass.contactNumber}</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Name */}
                    <div>
                      <label className="block text-[#453142] font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#453142]/20 rounded-lg focus:ring-2 focus:ring-[#453142] focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[#453142] font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#453142]/20 rounded-lg focus:ring-2 focus:ring-[#453142] focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {/* Phone & WhatsApp */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#453142] font-medium mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone || ''}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-[#453142]/20 rounded-lg focus:ring-2 focus:ring-[#453142] focus:border-transparent"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="block text-[#453142] font-medium mb-2">
                          WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#453142]/20 rounded-lg focus:ring-2 focus:ring-[#453142] focus:border-transparent"
                          placeholder="Same as phone"
                        />
                      </div>
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-[#453142] font-medium mb-2">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={formData.country || 'India'}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#453142]/20 rounded-lg focus:ring-2 focus:ring-[#453142] focus:border-transparent"
                      >
                        <option value="India">India</option>
                        <option value="USA">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="UAE">United Arab Emirates</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Australia">Australia</option>
                        <option value="Canada">Canada</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label className="block text-[#453142] font-medium mb-2">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes || ''}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-[#453142]/20 rounded-lg focus:ring-2 focus:ring-[#453142] focus:border-transparent resize-none"
                        placeholder="Any questions or special requirements?"
                      />
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-[#453142] to-purple-900 text-white py-6 text-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="mr-2 h-5 w-5" />
                            Complete Registration
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setSelectedClass(null)}
                        disabled={isSubmitting}
                        className="border-[#453142] text-[#453142]"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
