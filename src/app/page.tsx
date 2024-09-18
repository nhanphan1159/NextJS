'use client'
import { roboto, fontSuavity } from '@/app/font/font'
import { Button } from '@/components/ui/button'
import imgHeader from '@/app/img/intro-banner.png'
import imgAbout from '@/app/img/about-banner.png'
import envConfig from '@/config'

import Image from 'next/image'

export default function Home() {
    return (
        <main>
            <div className="flex flex-row w-full h-full justify-center items-center">
                <div className="flex flex-row justify-around items-end px-[263px] gap-[56px] w-full mb-40">
                    <div className="flex flex-col gap-[149px] items-start justify-end">
                        <div className="text-[120px] absolute top-[84px] left-[100]">
                            <p className={fontSuavity.className}>
                                Unleash Your Potential
                            </p>
                        </div>
                        <div className="flex flex-col items-start w-[474.74px] h-full gap-8 justify-end">
                            <h2 className="text-[24px] text-[#694E38]">
                                Embrace Your Journey
                            </h2>
                            <span className="text-[20px] text-[#555555]">
                                Are you a powerhouse woman with dreams as vast
                                as the horizon? Ready to turn those dreams into
                                reality? You're in the right place!
                            </span>
                            <label className="border-b border-[black] text-[24px]">
                                Read More
                            </label>
                        </div>
                    </div>
                    <div className="w-full h-full">
                        <Image
                            className="max-w-[400px] max-h-[550px]"
                            src={imgHeader}
                            alt="Picture of the author"
                        />
                        <p className="text-[#F3EBEB] rotate-270 absolute top-[250px] right-[75px] text-[60px] font-medium">
                            HAPPINESS
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col px-60 w-full justify-center items-center">
                <div className="w-full h-[873px] bg-[#F3EBEB] p-[100px] mb-40">
                    <div className="flex flex-row justify-center items-center gap-[60px]">
                        <div>
                            <Image
                                className="max-w-[400px] max-h-[773px]"
                                src={imgAbout}
                                alt="Picture of the author"
                            />
                        </div>
                        <div className="flex flex-col gap-[30px] items-start">
                            <div className="text-[128px] font-medium">
                                <p className={fontSuavity.className}>
                                    emilywatson.
                                </p>
                            </div>
                            <h2 className="text-[#694E38] uppercase text-[24px] font-light">
                                Lifestyle Coach and Writer
                            </h2>
                            <span className="text-[#555555] text-[24px]  leading-9	 font-extralight">
                                Hey there, I'm Emily, a passionate
                                entrepreneur,life coach, and devoted wife. My
                                mission? Empower women like you to break through
                                barriers, discover your authentic selves, and
                                build the life you've always envisioned.
                            </span>
                            <label className="border-b border-[black] text-[24px]">
                                Read More
                            </label>
                        </div>
                    </div>
                </div>
                <div className="w-full px-20 py-10 h-[324px] flex flex-row mb-40 gap-[100px] justify-around items-start">
                    <div className="w-full flex flex-col justify-center items-start h-full ">
                        <div className={fontSuavity.className}>
                            <h1 className="text-5xl mb-5">
                                Self Help Tips, Uplifting articles and Quick
                                Guides
                            </h1>
                        </div>
                        <span className="text-[#694E38] text-[24px] uppercase items-end">
                            Sign Up for my newsletter and start your day with
                            joy
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center h-full w-full">
                        <input
                            className="w-full h-[56px] pt-3 pb-1 border-[1px] border-[#D8D8D8] text-center flex rounded-[8px]"
                            type="text"
                            placeholder="Your email address"
                        />
                        <Button className="w-full h-[67px] mt-6 bg-[#9B7150]">
                            <span className="text-[19px] uppercase font-light">
                                Subscribe now
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}
