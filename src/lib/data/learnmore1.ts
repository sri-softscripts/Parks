export interface Publication {
  authors: string;
  title: string;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  year: string;
  doi?: string;
  pdfUrl?: string;
}

export interface ContentSection {
  title: string;
  paragraphs: string[];
}

export interface HeroImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface LearnMoreData {
  heroImages: HeroImage[];
  contentSections: ContentSection[];
  publications: Publication[];
  bibliographyPdfUrl: string;
  downloadText: string;
}

export const learnMoreData: LearnMoreData = {
  heroImages: [
    {
      src: "/images/img.png",
      width: 407,
      height: 469,
      alt: "PARC Listening Lab research image"
    },
    {
      src: "/images/img2.png",
      width: 407,
      height: 527,
      alt: "PARC Listening Lab analysis image"
    }
  ],
  
  contentSections: [
    {
      title: "PARC LISTENING LAB",
      paragraphs: [
        `<a href="https://sites.psu.edu/parcsocialscienceacoustics/" target="_blank">The Protected Areas Research Collaborative (PARC) Listening Lab</a> at Penn State University was established in 2023 in collaboration with the Natural Sounds and Night Skies Division of the National Park Service (NPS). The primary goal of this lab is to inventory sounds recorded in National Parks to better understand base level natural soundscapes of ecosystems and the influence of humans in those ecosystems. To accomplish this, undergraduate researchers analyze thousands of hours of acoustic data collected each year within park units. Results provide the NPS with a better understanding of base-levels of natural soundscapes, and over time monitoring changes allowing NPS staff to better understand global changes from climate, population change, human dynamics, changing technology and shifts in wildlife dynamics.`,
        `This lab is a collaborative effort between the Department of Recreation, Park, and Tourism Management in the College of Human Health and Development and the Graduate Program in Acoustics in the College of Engineering. Data from the lab can then be used to understand sound sources that naturally exist within units and those that may be intrusive. To accomplish this, PIs of this project are be equipped with "big-data" methods that go beyond traditional methods of "listening." This team utilizes traditional acoustic data processing techniques and also pushes the concept of the "listening lab" to the next level using Artificial Intelligence (AI) and Machine Learning through the development of algorithms that help in sound detection and identification.`,
        `Our work is funded by the National Park Service and the National Science Foundation Graduate Research Fellowship Program, among others.`
      ]
    },
    {
      title: "HOW WE DO IT?",
      paragraphs: [
        `Scientists at national parks across the country have set up microphones to record sounds throughout the NPS system. The systematic recording and analysis of sounds help us to understand and mitigate the impact of human activities have on park auditory environments. By deploying sensitive microphones and recording equipment in various parks, the Natural Sounds and Night Skies Division captures a wide range of sounds, from the subtle rustle of leaves to the calls of wildlife. The collected data helps inform management practices aimed at reducing noise pollution, enhancing visitor experiences, and safeguarding the natural acoustic environment for future generations. This initiative underscores the importance of natural sounds as a critical component of ecological integrity and visitor enjoyment in national parks.`,
        `The recordings are then transferred to the PARC Listening Lab here at Penn State, where our students listen to, analyze and inventory the sounds heard. Using National Park Service software, The Listening catalogs both natural and anthropogenic sounds. Software is used to analyze sound frequency, duration, and intensity, allowing us to discern patterns and assess the health of the soundscape. This analysis helps pinpoint sources of noise pollution, such as aircraft, vehicles, and human activities, and evaluate their impact on wildlife and visitor experiences. Additionally, these data are used to train machine learning algorithms to increase productivity and strengthen our understanding of park soundscapes.`,
        `The insights gained from these data are crucial for developing strategies to minimize noise pollution, such as implementing quiet zones, altering traffic patterns, or creating buffer zones. By leveraging comprehensive data sets, the National Park Service can make informed decisions to preserve the natural acoustic environment, ensuring that the serene sounds of nature remain a vital part of the national park experience. Once sounds are analyzed, the findings are sent back to officials at respective parks and used to inform management decisions about how best to protect natural quiet.`
      ]
    }
  ],
  
  publications: [
    {
      authors: "Danielle M Ferraro, Zachary D Miller, Lauren A Ferguson, B Derrick Taff, Jesse R Barber, Peter Newman, Clinton D Francis",
      title: "The phantom chorus: birdsong boosts human well-being in protected areas",
      journal: "The phantom chorus: birdsong boosts human well-being in protected areas. Proceedings of the Royal Society B, 287(1941), 20201811.",
      year: "2020",
      pages: "1-89",
      pdfUrl: "/pdf/Ferraro_et_al_2020.pdf"
    },
    {
      authors: "Lauren A Ferguson, B Derrick Taff, Justine I Blanford, Daniel J Mennitt, Andrew J Mowen, Mitchell Levenhagen, Crow White, Christopher A Monz, Clinton D Francis, Jesse R Barber, Peter Newman",
      title: "Understanding park visitors’ soundscape perception using subjective and objective measurement",
      journal: "Understanding park visitors’ soundscape perception using subjective and objective measurement. PeerJ, 12, e16592.",
      volume: "7",
      issue: "3",
      pages: "1036–1046",
      year: "2024",
      pdfUrl: "/pdf/Ferguson_et_al_2023.pdf"
    },
    {
      authors: "Lauren A Ferguson, P Newman, MF McKenna, DH Betchkal, ZD Miller, Rose Keller, KM Fristrup, B Derrick Taff",
      title: "How much noise is too much? Methods for identifying thresholds for soundscape quality and ecosystem services",
      journal: "How much noise is too much? Methods for identifying thresholds for soundscape quality and ecosystem services. Applied Acoustics, 209, 109388.",
      volume: "13",
      issue: "52",
      pages: "201–204",
      year: "2023",
      doi: "https://doi.org/10.4103/1463-1741.80148"
    },
    {
      authors: "Cory A Toth, Benjamin P Pauli, Christopher JW McClure, Clinton D Francis, Peter Newman, Jesse R Barber, Kurt Fristrup",
      title: "A stochastic simulation model for assessing the masking effects of road noise for wildlife, outdoor recreation, and bioacoustic monitoring",
      journal: "A stochastic simulation model for assessing the masking effects of road noise for wildlife, outdoor recreation, and bioacoustic monitoring. Oecologia, 199(1), 217-228.",
      volume: "39",
      pages: "81-89",
      year: "2022"
    },
    {
      authors: "William L Rice, Peter Newman, Katherine Y Zipp, B Derrick Taff, Ashley R Pipkin, Zachary D Miller, Bing Pan",
      title: "Balancing quietness and freedom: Support for reducing road noise among park visitors",
      journal: "Balancing quietness and freedom: Support for reducing road noise among park visitors. Journal of Outdoor Recreation and Tourism, 37, 100474.",
      volume: "71",
      issue: "5",
      pages: "1617–1620",
      year: "2022",
      doi: "https://doi.org/10.2193/2006-026"
    },
    {
      authors: "Zachary D Miller, William L Rice, Peter Newman, B Derrick Taff, Jake Gottschalk, Caleb Meyer, J Adam Beeco",
      title: "Pavement treatment type influences visitor experiences related to vehicular road sounds in Death Valley National Park",
      journal: "Pavement treatment type influences visitor experiences related to vehicular road sound in Death Valley National Park. Journal of Ecotourism, 20(3), 211-223.",
      volume: "26",
      issue: "3",
      year: "2021"
    },
    {
      authors: "J. R. Barber. Levenhagen, M. J., Z. D. Miller, A. R. Petrelli, L. A. Ferguson, Y.-H. Shr, B. Taff, K. M. Fristrup, C. J. W. McClure, S. Burson, M. Giamellaro, P. Newman, C. D. Francis",
      title: "Does experimentally quieting traffic noise beenfit people and birds?",
      journal: "Does experimentally quieting traffic noise benefit people and birds?. Ecology and Society.",
      volume: "9",
      pages: "495",
      year: "2021",
      pdfUrl: "/pdf/Levenhagen_et_al_2021.pdf"
    },
    {
      authors: "Mitchell J Levenhagen, Zachary D Miller, Alissa R Petrelli, Lauren A Ferguson, Yau‐Huo Shr, Dylan GE Gomes, Brendan D Taff, Crow White, Kurt Fristrup, Christopher Monz, Christopher JW McClure, Peter Newman, Clinton D Francis, Jesse R Barber",
      title: "Ecosystem services enhanced through soundcapes management link people and wildlife",
      journal: "Ecosystem services enhanced through soundscape management link people and wildlife. People Nat, 3(1), 176-189.",
      volume: "73",
      issue: "3",
      pages: "434–440",
      year: "2020",
      pdfUrl: "/pdf/Levenhagen_et_al_2020pdf.pdf"
    },
    {
      authors: "William L Rice, Peter Newman, Zachary D Miller, B Derrick Taff",
      title: "Protected areas noise abatement: A spatial approach",
      journal: "Protected areas and noise abatement: A spatial approach. Landscape and Urban Planning, 194, 103701.",
      volume: "26",
      pages: "1327–1344",
      year: "2020",
      doi: "https://doi.org/10.1007/s10980-011-9635-x"
    },
    {
      authors: "Mitchell J Levenhagen, AR Petrelli, ZD Miller, Lauren A Ferguson, YauHuo Shr, Dylan GE Gomes, B Derrick Taff, Crow White, Kurt Fristrup, Christopher Monz, Christopher JW McClure, Peter Newman, Clinton D Francis, Jesse R Barber",
      title: "Quieting soundscapes increases birds, heightens human experience and amplifies support for conservation",
      journal: "Quieting soundscapes increases birds, heightens human experience and amplifies support for conservation. People and Nature, (PaN-65).",
      volume: "209",
      pages: "109388",
      year: "2020",
      pdfUrl: "/pdf/Levenhagen_et_al_2020pdf.pdf"
    },
    {
      authors: "Jacob Benfield, BD Taff, David Weinzimmer, Peter Newman",
      title: "Motorized Recreation Sounds Influence Nature Scene Evaluations: The Role of Attitude Moderators",
      journal: "Motorized recreation sounds influence nature scene evaluations: The role of attitude moderators. Frontiers in Psychology, 9, 495.",
      volume: "287",
      issue: "1941",
      pages: "1-12",
      year: "2018",
      pdfUrl: "/pdf/Benfield_et_al_2018.pdf"
    },
    {
      authors: "S.R. Manning, R.E., Newman, P., Barber, J., Monz, C., Hallo, J., Lawson",
      title: "Principles for studying and managing natural quiet and natural darkness in national parks and other protected areas.",
      journal: "Principles for studying and managing natural quiet and natural darkness in national parks and other protected areas. In The George Wright Forum (Vol. 35, No. 3, pp. 350-362). George Wright Society.",
      volume: "203",
      pages: "245–254",
      year: "2018",
      pdfUrl: "/pdf/Manning_et_al_2018.pdf"
    },
    {
      authors: "ZD Miller, B Derrick Taff, Peter Newman",
      title: "Visitor experiences of wilderness soundscapes in Denali National Park and Preserve.",
      journal: "Visitor experiences of wilderness soundscapes in Denali National Park and Preserve. Int. J. Wilderness, 24(2).",
      volume: "19",
      issue: "16",
      pages: "1415–1419",
      year: "2018",
      doi: "https://doi.org/10.1016/j.cub.2009.06.052"
    },
    {
      authors: "R.E. Manning, P. Newman, J. Barber, C. Halo, J., Monz, S.L. Lawson",
      title: "Natural Quiet and Natural Darkness: The new Resources of the National Parks",
      journal: "Natural Quiet and Natural Darkness: The new Resources of the National Parks. University Press of New England.",
      volume: "19",
      issue: "2",
      pages: "6–13",
      year: "2018"
    },
    {
      authors: "B. D. Xu, X., Yang, R., Newman, P., Taff",
      title: "Literature review of the soundscape of national parks",
      journal: "Literature review of the soundscape of national parks. Chinese Landscape Architecture, 32(7), 25-30.",
      year: "2017",
      pdfUrl: "assets/pdf/Levenhagen_et_al_2021.pdf"
    },
    {
      authors: "Jesse R Barber, Mitchell J Levenhagen, Clinton D Francis, Peter Newman, Derrick Taff, Lauren C Abbott, Kurt Fristrup, Shan Burson, Jennifer Newton, Christopher Monz, Crow White, Alissa R Petrelli",
      title: "Ecosystem services provided by soundscapes link people and wildlife: Evidence from mitigation studies in a protected natural area",
      journal: "Ecosystem services provided by soundscapes link people and wildlife: Evidence from mitigation studies in a protected natural area. UW-National Park Service Research Station Annual Reports, 39, 81-89.",
      volume: "3",
      issue: "1",
      pages: "176-189",
      year: "2016",
      pdfUrl: "/pdf/Levenhagen_et_al_2018.pdf"
    },
    {
      authors: "Christopher Monz, Ashley D'Antonio, Steve Lawson, Jesse Barber, Peter Newman",
      title: "The ecological implications of visitor transportation in parks and protected areas: Examples from research in US National Parks",
      journal: "The ecological implications of visitor transportation in parks and protected areas: Examples from research in US National Parks. Journal of Transport Geography, 51, 27-35.",
      volume: "PaN-65",
      year: "2016",
      pdfUrl: "/pdf/Monz_et_al_2015.pdf"
    },
    {
      authors: "A. Abbott, L. A., Taff, B. D., Newman, P., Benfield, J. A., Mowen",
      title: "The Influence of natural sounds on restoration",
      journal: "The influence of natural sounds on attention restoration (Doctoral dissertation, Pennsylvania State University).",
      volume: "35",
      issue: "3",
      pages: "350-362",
      year: "2016",
      pdfUrl: "/pdf/Abbott_2015.pdf"
    },
    {
      authors: "LA Ferguson, PB Newman, DH Betchkal, MF McKenna, M Lane, BD Taff",
      title: "Understanding vehicle noise as an indicator of soundscape quality in Denali National Park and Preserve",
      journal: "Understanding vehicle noise as an indicator of soundscape quality in Denali National Park and Preserve. Journal of Outdoor Recreation and Tourism, 52, 100971.",
      year: "2025"
    },
    {
      authors: "Lauren A Ferguson, Brian A Peterson, Morgan Crump, B Derrick Taff, Peter Newman, Davyd Halyn Betchkal, JM Shawn Hutchinson, J Adam Beeco",
      title: "Integrating aircraft tracking, acoustic data, and surveys to evaluate park aircraft noise",
      journal: "Integrating aircraft tracking, acoustic data, and surveys to evaluate park aircraft noise. Tourism Geographies, 1-20.",
      volume: "19",
      issue: "6",
      pages: "498–511",
      year: "2025",
      pdfUrl: "/pdf/Integrating aircraft tracking  acoustic data  and surveys to evaluate park aircraft noise.pdf"
    },
    {
      authors: "Carter Allen Paprocki, Andrew Barnard, Kristin Cody, Tyler Dare, Peter Newman, Derrick Taff, Morgan Crump",
      title: "Evaluation of machine learning performance on source separated passive acoustic recordings",
      journal: "Evaluation of machine learning performance on source separated passive acoustic recordings. In INTER-NOISE and NOISE-CON Congress and Conference Proceedings (Vol. 271, No. 2, pp. 308-320). Institute of Noise Control Engineering.",
      volume: "69",
      issue: "2",
      pages: "77–92",
      year: "2025",
      pdfUrl: "/pdf/142890-evaluation-of-machine-learning-performance-on-source-separated-passive-acoustic-recordings.pdf"
    }
  ],
  
  bibliographyPdfUrl: "/pdf/Soundboard_Bibliography.pdf",
  downloadText: "For a complete list of resources, download the bibliography from the link below:"
};