"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

const plan = {
  'Week 1': {
    'Day 1 - Strength & Core': [
      '15 Air Squats',
      '10 Push-Ups',
      '10 Walking Lunges (each leg)',
      '20s Side Plank (each side)',
      '20 Mountain Climbers (each leg)'
    ],
    'Day 2 - Cardio': [
      '30–40 min brisk walk, jog, or jog-walk intervals',
      'Optional: light hill or incline',
      'Cooldown: 5 min walk + stretching'
    ],
    'Day 3 - Full-Body Conditioning': [
      '4 Rounds:',
      '10 Burpees',
      '20 KB/DB Swings or Squat Jumps',
      '30s Dead Hang or Bent Over Rows',
      '10 V-Ups or Crunches',
      '200m Run or 1-min Row/Bike'
    ]
  },
  'Week 2': {
    'Day 1 - Strength & Grip': [
      '8 Pull-Ups or Assisted Pull-Ups',
      '15 Goblet Squats',
      '30s Farmer’s Carry',
      '20 Push-Ups',
      '30s Plank with shoulder taps'
    ],
    'Day 2 - Tempo Run + Core': [
      '10 min easy jog',
      '15–20 min moderate run',
      '5 min walk',
      'Core: 20 Russian Twists, 20 Leg Raises, 30s Plank (3 sets)'
    ],
    'Day 3 - Bodyweight Blast': [
      '30 min AMRAP:',
      '10 Jump Squats',
      '10 Push-Ups',
      '10 Sit-Ups',
      '5 Burpees',
      '30s Dead Hang or towel grip hold'
    ]
  },
  'Week 3': {
    'Day 1 - Upper Body & Core': [
      '3 Rounds:',
      '10 Pull-Ups or Inverted Rows',
      '15 DB Shoulder Press',
      '30s Hollow Hold',
      '15 Push-Ups',
      '20 Russian Twists'
    ],
    'Day 2 - Long Cardio + Strength': [
      '5–7k run or 45–50 mins steady cardio',
      'Every 10 mins: 10 Squats, 10 Push-Ups, 10 Lunges',
      'Cooldown walk + stretch'
    ],
    'Day 3 - HIIT Circuit': [
      '3 Rounds:',
      '20 Box Jumps or Step-Ups',
      '30s Bear Crawl',
      '15 KB Swings',
      '10 Burpees',
      '200m Sprint or 1-min Row',
      'Optional: Weighted carry 30s between rounds'
    ]
  },
  'Week 4': {
    'Day 1 - Full Strength': [
      'Superset x 3:',
      '8 Deadlifts',
      '12 Pull-Ups or Rows',
      '15 Push Press',
      '20 Weighted Lunges',
      '1 min Plank'
    ],
    'Day 2 - Tough Mudder Simulation': [
      '60-min mixed session:',
      '5-min jog',
      '2 rounds: 20 Burpees, 30 Mountain Climbers, 40 Air Squats, 50s Dead Hang',
      '5-min jog',
      'Repeat'
    ],
    'Day 3 - Grip + Functional HIIT': [
      '3–4 Rounds:',
      '30s Farmer’s Carry',
      '20 Jump Squats',
      '10 Burpees',
      '10 Pull-Ups or 30s Towel Hang',
      '1-min Rest',
      'Finish: 3 x 20s sprints'
    ]
  },
  'Week 5': {
    'Day 1 - Light Strength & Mobility': [
      '3 Sets:',
      '10 Air Squats',
      '10 Push-Ups',
      '10 Lunges',
      '30s Plank',
      '5 Pull-Ups',
      'Stretching + 5 min foam rolling'
    ],
    'Day 2 - Easy Cardio': [
      '20–30 min light jog or walk',
      'Optional: 2–3 hill sprints',
      'Mobility: hips, shoulders, hamstrings'
    ],
    'Day 3 - Race Ready Routine': [
      '20 min light full-body circuit',
      '10 min walk',
      'Gear check, hydration, review obstacles'
    ]
  }
};

export default function ToughMudderApp() {
  const [checked, setChecked] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem('mudder-checks');
    if (stored) setChecked(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('mudder-checks', JSON.stringify(checked));
  }, [checked]);

  const toggleCheck = (week, day, idx) => {
    const key = `${week}-${day}-${idx}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center tracking-tight">Ruggable Tough Mudder Plan</h1>
      <Tabs defaultValue="Week 1" className="w-full">
        <TabsList className="flex flex-wrap gap-2 justify-center mb-6">
          {Object.keys(plan).map(week => (
            <TabsTrigger key={week} value={week}>{week}</TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(plan).map(([week, days]) => (
          <TabsContent key={week} value={week}>
            <div className="grid gap-6">
              {Object.entries(days).map(([day, exercises]) => (
                <Card key={day} className="border shadow-lg rounded-2xl">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">{day}</h2>
                    <ul className="space-y-3">
                      {exercises.map((ex, idx) => {
                        const key = `${week}-${day}-${idx}`;
                        return (
                          <li key={key} className="flex items-center gap-3">
                            <Checkbox
                              checked={checked[key] || false}
                              onCheckedChange={() => toggleCheck(week, day, idx)}
                            />
                            <span className="text-base">{ex}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}