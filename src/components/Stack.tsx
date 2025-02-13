import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { FaHtml5, FaCss3Alt, FaNodeJs , FaGithub} from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { RiReactjsLine, RiTailwindCssFill } from 'react-icons/ri';
import { DiMongodb } from 'react-icons/di';
import { SiExpress, SiNextdotjs, SiTypescript, SiDocker, SiPrisma, SiPostgresql ,SiFirebase , SiVercel , SiCloudflare ,SiBulma} from 'react-icons/si';

export function Stack() {
  return (
    <div className="absolute top-[calc(23%+2rem)] flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
        Stacks
      </span>
      <OrbitingCircles iconSize={40} radius={90} reverse speed={2}>
        <FaGithub className="text-7xl text-gray-500" />
      <SiTypescript className="text-7xl text-blue-500" />
        <RiReactjsLine className="text-7xl text-cyan-500" />
        <DiMongodb className="text-7xl text-green-500" />
      </OrbitingCircles>

      <OrbitingCircles iconSize={40} radius={170}  speed={2}>
        <FaHtml5 className="text-7xl text-orange-500" />
        <FaCss3Alt className="text-7xl text-blue-500" />
        <IoLogoJavascript className="text-7xl text-yellow-500" />
        <SiPostgresql className="text-7xl text-blue-700" />
        <SiNextdotjs className="text-7xl text-gray-500" />
        <FaNodeJs className="text-7xl text-green-700" />
      </OrbitingCircles>


      <OrbitingCircles iconSize={40} radius={230} reverse speed={2}>
      <SiExpress className="text-7xl text-green-600" />
        <RiTailwindCssFill className="text-7xl text-teal-400" />
        <SiPrisma className="text-7xl text-green-600" />
        <SiDocker className="text-7xl text-blue-500" />
        <SiFirebase className="text-7xl text-yellow-500" />
        <SiVercel className="text-7xl text-gray-500" />
        <SiCloudflare className="text-7xl text-orange-500" />
        <SiBulma className="text-7xl text-purple-500" />
    </OrbitingCircles>
    
    </div>
  );
}