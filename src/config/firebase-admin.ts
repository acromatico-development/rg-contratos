import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const projectId = process.env.FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

const firebaseAdminConfig = {
    credential: cert({
        projectId,
        clientEmail,
        privateKey,
    }),
}

const apps = getApps()
const firebaseAdmin = apps.length === 0 ? initializeApp(firebaseAdminConfig) : apps[0]

export const adminAuth = getAuth(firebaseAdmin) 