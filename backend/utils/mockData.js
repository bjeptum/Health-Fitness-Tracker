const mockWorkoutPlans = [
    {
        name: 'Cardio Blast',
        description: 'Get your heart racing with this full-body burn!',
        exercises: [
          { name: 'Jumping Jacks', description: '3 sets of 20. Let’s get that blood pumping!', duration: 5 },
          { name: 'Jogging', description: 'Run at a comfy pace for 30 minutes and feel the burn!', duration: 30 },
          { name: 'Cycling', description: 'Pedal away for 45 minutes—steady and strong!', duration: 45 },
          { name: 'Rope Skipping', description: 'Jump rope for 15 minutes, mix it up with intervals!', duration: 15 },
          { name: 'Swimming', description: 'Swim for 1 hour, switch up your strokes for a full-body workout!', duration: 60 },
          { name: 'HIIT', description: '20 minutes of explosive intervals to torch those calories!', duration: 20 },
        ],
      },
      {
        name: 'Muscle Strength Training',
        description: 'Time to build those muscles and feel unstoppable!',
        exercises: [
          { name: 'Squats', description: '3 sets of 10. Feel the burn in those legs!', duration: 15 },
          { name: 'Push-ups', description: '3 sets of 15. Let’s power up those arms and chest!', duration: 10 },
          { name: 'Pull-ups', description: '3 sets of 8. Show off your upper body strength!', duration: 20 },
          { name: 'Deadlifts', description: '3 sets of 5. Lift heavy, feel strong!', duration: 25 },
          { name: 'Bench Press', description: '3 sets of 12. Push it to the limit and feel the power!', duration: 20 },
          { name: 'Dumbbell Rows', description: '3 sets of 10 per arm. Row like a champ!', duration: 15 },
        ],
      },
      {
        name: 'Flexibility Yoga',
        description: 'Stretch it out and feel zen with this yoga flow.',
        exercises: [
          { name: 'Sun Salutation', description: '5 rounds to greet the day with energy!', duration: 15 },
          { name: 'Warrior Pose', description: 'Hold for 1 minute each side. Feel like a warrior!', duration: 10 },
          { name: 'Downward Dog', description: 'Hold for 1 minute and stretch it out!', duration: 5 },
          { name: 'Tree Pose', description: 'Balance it out—30 seconds per side. Stay grounded!', duration: 10 },
          { name: 'Child’s Pose', description: 'Chill in Child’s Pose for 3 minutes. Relax and breathe.', duration: 20 },
        ],
      },
      {
        name: 'Core Focus',
        description: 'Tighten up your core with these powerful moves!',
        exercises: [
          { name: 'Plank', description: 'Hold for 1 minute. Brace your core like a pro!', duration: 10 },
          { name: 'Russian Twists', description: '3 sets of 20 twists. Work that waist!', duration: 10 },
          { name: 'Leg Lifts', description: '3 sets of 15. Lift those legs to the sky!', duration: 15 },
          { name: 'Crunches', description: '3 sets of 20. Feel the burn in those abs!', duration: 10 },
          { name: 'Bicycle Crunches', description: '3 sets of 20. Pedal your way to a tighter core!', duration: 15 },
        ],
      },
      {
        name: 'Pilates Strength',
        description: 'Build strength, flexibility, and control with Pilates.',
        exercises: [
          { name: 'Hundred', description: '100 pumps—hold that V-sit and feel the burn!', duration: 10 },
          { name: 'Roll-Up', description: '3 sets of 10. Roll and rise with control!', duration: 15 },
          { name: 'Single Leg Stretch', description: '3 sets of 10 per leg. Stretch it out and engage your core!', duration: 15 },
          { name: 'Swimming', description: '3 sets of 20. Get into the rhythm with these swimming moves!', duration: 15 },
          { name: 'Leg Pull Front', description: '3 sets of 10. Stretch and strengthen your legs!', duration: 15 },
        ],
      },
      {
        name: 'Total Body Circuit',
        description: 'A full-body workout that targets everything, no muscle left behind!',
        exercises: [
          { name: 'Burpees', description: '3 sets of 10. Jump, squat, and push—get moving!', duration: 15 },
          { name: 'Mountain Climbers', description: '3 sets of 20. Climb your way to the top!', duration: 10 },
          { name: 'Dumbbell Lunges', description: '3 sets of 10 per leg. Lunge for strength and balance!', duration: 15 },
          { name: 'Push Press', description: '3 sets of 10. Press those weights to the sky!', duration: 15 },
          { name: 'Plank with Shoulder Taps', description: 'Hold and tap for 1 minute. Stay stable, tap your way to success!', duration: 20 },
        ],
      },
];

module.exports = mockWorkoutPlans;
