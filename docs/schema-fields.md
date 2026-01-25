# LifeOS Schema Fields

## User
- id (Int)
- email (String, unique)
- username (String, unique)
- displayName (String)
- passwordHash (String)
- createdAt / updatedAt (DateTime)

## Entry
- id (Int)
- userId (Int)
- entryDate (DateTime)
- title (String)
- narrative (String)
- identityStatement (String, optional)
- antiVision (String, optional)
- microAction (String, optional)
- alignmentScore (Int 0-100, optional)
- energyScore (Int 0-10, optional)
- moodScore (Int 0-10, optional)
- createdAt / updatedAt (DateTime)

## Feedback
- id (Int)
- userId (Int)
- entryId (Int)
- summary (String)
- correction (String)
- nextAction (String)
- severity (NORMAL | WARNING | CRITICAL)
- createdAt (DateTime)

## Goal
- id (Int)
- userId (Int)
- title (String)
- description (String, optional)
- targetDate (DateTime, optional)
- status (ACTIVE | PAUSED | COMPLETED)
- createdAt / updatedAt (DateTime)
