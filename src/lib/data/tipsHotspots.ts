// src/lib/data/hotspots-data.ts

export interface TipHotspot {
  id: string;
  title: string;
  thumbnail: string;
  image: string;
  highlight: string;
  content: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
}

export const tipsHotspots: TipHotspot[] = [
  {
    id: "tip-tech",
    title: "USE QUIET TECHNOLOGY",
    thumbnail: "/images/thumb-tips-technology.webp",
    image: "/images/christina-silo@2x.png",
    highlight: "We lowered noise emission standards for snowmobiles in Yellowstone, and we created an additional policy incentive to encourage manufacturers to build quieter snowmobiles in the future. I also worked with snowcoach operators to implement the use of low pressure tires instead of tracks, making snowcoaches 4–5 times quieter.",
    content: `<p>
        Transportation, including vehicles, aircraft, watercraft, and
        recreational vehicles can contribute large amounts of
        human-caused noise in park settings. Implementing quiet
        technology can help reduce noise emissions from
        transportation. This can include new types of motors, new
        tires/treads, or a variety of other technologies.
      </p>
      <p>
        Christina White from Yellowstone National Park, tells us how
        she is implementing techniques like this to reduce over-snow
        vehicle noise:
      </p>`,
       position: { x: -200, y: Math.sin(0) * 100, z: -200 }
  },
  {
    id: "tip-maintenance",
    title: "WORK WITH MAINTENANCE CREWS",
    thumbnail: "/images/thumb-tractor.webp",
    image: "/images/large-maintenance@2x.jpg",
    highlight: "We implement grounds work using 'Future Leaders' in the youth program on weekends to give the visitors and neighbors a break from the noise. We have found a little planning allows us to get the 'noisy' work completed during the weekdays. We have also replaced mowers, weed-wackers, leaf blowers, and chain saws with battery powered equipment. This has really helped with not only noise polution, but reducing our carbon footprint as well.",
    content: `<p>
        Maintenance equipment, such as a leaf blower, lawn mowers, chain
        saws, and other types of equipment can generate noise in park
        settings. Maintenance and facilities crews can consider sheduling
        louder activities during more appropriate times of the day or
        week. Similar to transportation, quiet technology can also be used
        to reduce noise emissions.
      </p>
      <p>
        Douglas Law from Salem Maritime/Saugus Iron Works National
        Historic Sites explains how minor changes to maintenance schedules
        and equipment can improve soundscape conditions:
      </p>`,
    position: { x: -100, y: Math.sin(Math.PI/3) * 140, z: -100 }
  },
  {
    id: "tip-zoning",
    title: "USE ZONING",
    thumbnail: "/icons/thumb-cathedral-grove.svg",
    image: "/images/large-zoning@2x.jpg",
    highlight: "",
    content: `<p>
        Parks are often not homogenous places. Instead, they provide
        a variety of different recreation opportunities for
        visitors. Zoning can help managers focus on placing limited
        resource in strategic areas for reducing noise emissions.
        Zoning is not only spatial, but also temporal.
      </p>
      <p>
        Take for example Muir Woods National Monument. In this park,
        managers implemented both "quiet zones" and "quiet days"
        which reflect the spatial and temporal aspects of zoning.
        (Stack et al., 2011)
      </p>`,
    position: { x: -300, y: 20, z: 50 }
  },
  {
    id: "tip-framework",
    title: "FOLLOW MANAGEMENT-BY-OBJECTIVES FRAMEWORK",
    thumbnail: "/icons/thumb-framework.svg",
    image: "/images/large-framework@2x.png",
    highlight: "Management-by-objective frameworks institutionalize science based decision making where managers set desired conditions, create indicators and standards of quality and use science based approaches to measure change and efficacy of management actions. This process allows agencies to learn and adapt to rapidly changing and complex human-ecological systems.",
    content: `<p>
        Frameworks, like the Visitor Experience and Resource
        Protection and Visitor Use Management frameworks, can help
        establish successfully manage soundscape resources by using
        a five-step process. Here is how:
      </p>
      <ol class="list">
        <li>
          <strong>Establish management objectives</strong><br />
          These broad narrative statements describe the desired
          conditions of park resources and experiences.
        </li>
        <li>
          <strong>Identify indicators and thresholds</strong><br />
          Indicators are measurable and manageable variables that
          relate to your management objectives. Thresholds are the
          range of acceptable conditions for an indicator and allow
          managers to understand how observed conditions related to
          management objectives.
        </li>
        <li>
          <strong>Monitor the indicators</strong><br />
          Gathering data from the indicators helps you describe current
          conditions and understand what needs to be done to achieve
          your managment objectives.
        </li>
        <li>
          <strong>Implement management actions</strong><br />
          Armed with an understanding of current conditions and thresholds
          regarding the indicators, management can be enacted in an
          adaptive process to help achieve management goals.
        </li>
        <li>
          <strong>Repeat steps 4 and 5</strong><br />
          Periodic monitoring will allow you to understand the effect of your
          management actions, and whether new or additional actions
          need to be implemented.
        </li>
      </ol>
      <p>
        Dr. Peter Newman has conducted research in parks using
        management-by-objectives frameworks for over XX years.
        According to Dr. Newman:
      </p>`,
    position: { x: 100, y: Math.sin(4*Math.PI/3) * 140, z: 100 }
    
  },
  {
    id: "tip-engage",
    title: "ENGAGE VISITORS",
    thumbnail: "/images/thumb-tips-white-bird.webp",
    image: "/images/large-engage@2x.png",
    highlight: "",
    content: `<p>
        Kurt Fristrup, the Science and Technology Branch Chief of
        the Natural Sounds and Night Skies Division of the NPS,
        believes that encouraging visitors to attentively engage
        soundscapes in parks can enrich their experiences (Selleck &
        KellerLynn, 2010). Some studies show that over 90% of
        visitors find the opportunity to experience natural quiet
        and the sounds of nature to be compelling reasons to visit
        parks (McDonals et al., 1995)
      </p>
      <p>
        In Glacier National Park, interpretive signs help encourage
        visitors on the Trail of the Cedars to enjoy the natural
        sounds of the trail.
      </p>`,
    position: { x: 150, y: 80, z: -380 }
  },
  {
    id: "tip-education",
    title: "USE EDUCATION AND INTERPRETATION",
    thumbnail: "/images/thumb-man.webp",
    image: "/images/large-education@2x.png",
    highlight: "Military overflights in Sequoia National Park have a negative impact on visitor experience, but are likely to continue. We found that implementing an education program about the overflights helped increase the acceptability of military aircraft sounds to visitors by up to 15%",
    content: `<p>
        Education and interpretation can be used in parks for
        both reducing noise emissions and mitigating impacts
        related to noise. This can include not only reducing
        things like visitor-caused sounds, but can also help
        visitors cope with noises that are present but hard to
        manage. (Taff et al., 2014)
      </p>
      <p>
        [Lorem ipsum name] talks about how education is in Muir
        Woods National Monument:
      </p>
      <p>
        Dr. Derrick Taff explains the role of education in
        Sequoia National Park:
      </p>`,
    position: { x: -150, y: -90, z: -280 }
  }
];