import { prisma } from '../lib/prisma.js'
import type { Request, Response } from 'express'

export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await prisma.github_profile.findMany()
    return res.json({ profiles })
  } catch (error) {
    console.log(error)
  }
}

export const getProfile = async (req: Request, res: Response) => {
  const username = req.params.username
  if(typeof username != "string"){
    return res.status(409).json({ message: "username is invalid" })
  }
  try {
    const profile = await prisma.github_profile.findUnique({
      where: {
        username: username
      }
    })
    return res.json({ profile })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

