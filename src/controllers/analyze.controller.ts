import { prisma } from '../lib/prisma.js'
import type { Request, Response } from 'express'
import type { user } from '../types/user.js'

// export const analyzeProfile = async (req: Request, res: Response) => {
//   const username = req.params.username
//   console.log(username)
//   if(typeof username != "string"){
//     return res.status(409).json({ message: "username is invalid" })
//   }
//     try {
//       const response = await fetch(`https://api.github.com/users/${username}`)
//       if(response.status == 404){
//         return res.status(404).json({ message: `There is no user with username ${username}` })
//       }
//       const data = (await response.json() as user)
//       console.log(data)
//       const profile = await prisma.github_profile.create({
//         data: {
//           username: username,
//           // name
//           bio: data?.bio!,
//           public_repos: data.public_repos,
//           followers: data.followers,
//           following: data.following,
//           total_stars: 3
//         }
//       })
//       return res.status(201).json({ profile: profile })
  
//     } catch (error:any) {
//       if(error.code='P2002'){
//         return res.status(409).json({ message: "Already fetched data for this user" })
//       }
//       console.log(error)
//     }
// }




interface GitHubUser {
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  stargazers_count: number;
  language: string | null;
}

export const analyzeProfile = async (req: Request, res: Response) => {
  const a = await prisma.github_profile.delete({
    where: {
      id: 1
    }
  })
  const username = req.params.username;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ message: "Username is invalid or missing" });
  }

  try {
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    if (userResponse.status === 404) {
      return res.status(404).json({ message: `There is no user with username ${username}` });
    }
    if (!userResponse.ok) {
      return res.status(userResponse.status).json({ message: "Failed to fetch user data from GitHub" });
    }

    const userData = (await userResponse.json()) as GitHubUser;

    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=10&sort=created&direction=desc`);
    let totalStars = 0;
    let topLanguage: string | null = null;

    if (reposResponse.ok) {
      const reposData = (await reposResponse.json()) as GitHubRepo[];
      console.log(reposData)

      const languageCounts: Record<string, number> = {};
      
      reposData.forEach((repo) => {
        totalStars = totalStars + (repo.stargazers_count || 0)

        if(repo.language){
          languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1
        }
        let maxCount = 0;
        for(const [language,count] of Object.entries(languageCounts)){
          if(count > maxCount){
            maxCount = count
            topLanguage = language
          }
        }
      })
      console.log(totalStars)
    }

    const profile = await prisma.github_profile.upsert({
      where: {
        username: username,
      },
      update: {
        bio: userData.bio || "", 
        public_repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        total_stars: totalStars,
        top_language: topLanguage
      },
      create: {
        username: username,
        bio: userData.bio || "",
        public_repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        total_stars: totalStars,
        top_language: topLanguage
      },
    });

    return res.status(201).json({ profile });

  } catch (error: any) {
    console.error("Error in analyzeProfile:", error);
  }
};