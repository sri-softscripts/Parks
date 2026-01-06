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
      authors: "Abbott, L., Newman, P., & Benfield, J.",
      title: "The influence of natural sounds on attention restoration",
      journal: "Doctoral dissertation, Pennsylvania State University",
      year: "2015",
      pdfUrl: "assets/pdf/Abbott_2015.pdf"
    },
    {
      authors: "Alvarsson, J. J., Wiens, S., & Nilsson, M. E.",
      title: "Stress recovery during exposure to nature sound and environmental noise",
      journal: "International Journal of Environmental Research and Public Health",
      volume: "7",
      issue: "3",
      pages: "1036–1046",
      year: "2010",
      doi: "https://doi.org/10.3390/ijerph7031036"
    },
    {
      authors: "Babisch, W.",
      title: "Cardiovascular effects of noise",
      journal: "Noise and Health",
      volume: "13",
      issue: "52",
      pages: "201–204",
      year: "2011",
      doi: "https://doi.org/10.4103/1463-1741.80148"
    },
    {
      authors: "Barber, J. R., Levenhagen, M. J., Francis, C. D., Newman, P., Taff, D., Abbott, L. C., … & Petrelli, A. R.",
      title: "Ecosystem services provided by soundscapes link people and wildlife: Evidence from mitigation studies in a protected natural area",
      journal: "UW-National Park Service Research Station Annual Reports",
      volume: "39",
      pages: "81-89",
      year: "2016"
    },
    {
      authors: "Barton, D. C., & Holmes, A. L.",
      title: "Off-Highway Vehicle Trail Impacts on Breeding Songbirds in Northeastern California",
      journal: "Journal of Wildlife Management",
      volume: "71",
      issue: "5",
      pages: "1617–1620",
      year: "2007",
      doi: "https://doi.org/10.2193/2006-026"
    },
    {
      authors: "Bell, P.A., Mace, B.L, & Benfield, J.A.",
      title: "Aircraft overflights at national parks, Conflict and its potential resolution",
      journal: "Special Issue: From landscapes to soundscapes: Park Science",
      volume: "26",
      issue: "3",
      year: "2010"
    },
    {
      authors: "Benfield, J., Taff, B. D., Weinzimmer, D., & Newman, P.",
      title: "Motorized recreation sounds influence nature scene evaluations: The role of attitude moderators",
      journal: "Frontiers in Psychology",
      volume: "9",
      pages: "495",
      year: "2018",
      pdfUrl: "assets/pdf/Benfield_et_al_2018.pdf"
    },
    {
      authors: "Brumm, H.",
      title: "The impact of environmental noise on song amplitude in a territorial bird",
      journal: "Journal of Animal Ecology",
      volume: "73",
      issue: "3",
      pages: "434–440",
      year: "2004",
      doi: "https://doi.org/10.1111/j.0021-8790.2004.00814.x"
    },
    {
      authors: "Dumyahn, S. L., & Pijanowski, B. C.",
      title: "Soundscape conservation",
      journal: "Landscape Ecology",
      volume: "26",
      pages: "1327–1344",
      year: "2011",
      doi: "https://doi.org/10.1007/s10980-011-9635-x"
    },
    {
      authors: "Ferguson, L. A., Newman, P., McKenna, M. F., Betchkal, D. H., Miller, Z. D., Keller, R., … & Taff, B. D.",
      title: "How much noise is too much? Methods for identifying thresholds for soundscape quality and ecosystem services",
      journal: "Applied Acoustics",
      volume: "209",
      pages: "109388",
      year: "2023",
      pdfUrl: "assets/pdf/Ferguson_et_al_2023.pdf"
    },
    {
      authors: "Ferraro, D. M., Miller, Z. D., Ferguson, L. A., Taff, B. D., Barber, J. R., Newman, P., & Francis, C. D.",
      title: "The phantom chorus: birdsong boosts human well-being in protected areas",
      journal: "Proceedings of the Royal Society B",
      volume: "287",
      issue: "1941",
      pages: "20201811",
      year: "2020",
      pdfUrl: "assets/pdf/Ferraro_et_al_2020.pdf"
    },
    {
      authors: "Francis, C. D., Newman, P., Taff, B. D., White, C., Monz, C. A., Levenhagen, M., … Barber, J. R.",
      title: "Acoustic environments matter: Synergistic benefits to humans and ecological communities",
      journal: "Journal of Environmental Management",
      volume: "203",
      pages: "245–254",
      year: "2017",
      doi: "https://doi.org/10.1016/j.jenvman.2017.07.041"
    },
    {
      authors: "Francis, C. D., Ortega, C. P., & Cruz, A.",
      title: "Noise Pollution Changes Avian Communities and Species Interactions",
      journal: "Current Biology",
      volume: "19",
      issue: "16",
      pages: "1415–1419",
      year: "2009",
      doi: "https://doi.org/10.1016/j.cub.2009.06.052"
    },
    {
      authors: "Freimund, W., Sacklin, J., Patterson, M., Bosak, K., & Saxen, S.",
      title: "Soundscapes and the Winter Visitor Experience",
      journal: "Yellowstone Science",
      volume: "19",
      issue: "2",
      pages: "6–13",
      year: "2011"
    },
    {
      authors: "Levenhagen, M. J., McClure, C. J., & Barber, J. R.",
      title: "Does experimentally quieting traffic noise benefit people and birds?",
      journal: "Ecology and Society",
      year: "2021",
      pdfUrl: "assets/pdf/Levenhagen_et_al_2021.pdf"
    },
    {
      authors: "Levenhagen, M. J., Miller, Z. D., Petrelli, A. R., Ferguson, L. A., Shr, Y. H., Gomes, D. G., … & Barber, J. R.",
      title: "Ecosystem services enhanced through soundscape management link people and wildlife",
      journal: "People Nat",
      volume: "3",
      issue: "1",
      pages: "176-189",
      year: "2020",
      pdfUrl: "assets/pdf/Levenhagen_et_al_2020.pdf"
    },
    {
      authors: "Levenhagen, M. J., Petrelli, A. R., Miller, Z. D., Ferguson, L. A., Shr, Y., Gomes, D. G., … & Barber, J. R.",
      title: "Quieting soundscapes increases birds, heightens human experience and amplifies support for conservation",
      journal: "People and Nature",
      volume: "PaN-65",
      year: "2020",
      pdfUrl: "assets/pdf/Levenhagen_et_al_2020pdf.pdf"
    },
    {
      authors: "Manning, R., Newman, P., Barber, J., Monz, C., Hallo, J., & Lawson, S.",
      title: "Principles for studying and managing natural quiet and natural darkness in national parks and other protected areas",
      journal: "The George Wright Forum",
      volume: "35",
      issue: "3",
      pages: "350-362",
      year: "2018",
      pdfUrl: "assets/pdf/Manning_et_al_2018.pdf"
    },
    {
      authors: "McDonald, C.D., Baumgartner, R.M., Iachan, R.",
      title: "Aircraft management studies",
      journal: "USDI Report 94-2 Denver, CO",
      year: "1995"
    },
    {
      authors: "Miller, Z. D., Hallo, J. C., Sharp, J. L., Powell, R. B., & Lanham, J. D.",
      title: "Birding by Ear: A Study of Recreational Specialization and Soundscape Preference",
      journal: "Human Dimensions of Wildlife",
      volume: "19",
      issue: "6",
      pages: "498–511",
      year: "2014",
      doi: "https://doi.org/10.1080/10871209.2014.921845"
    },
    {
      authors: "Miller, N. P.",
      title: "US National Parks and management of park soundscapes: A review",
      journal: "Applied Acoustics",
      volume: "69",
      issue: "2",
      pages: "77–92",
      year: "2008",
      doi: "https://doi.org/10.1016/j.apacoust.2007.04.008"
    },
    {
      authors: "Miller, Z. D., Rice, W. L., Newman, P., Taff, B. D., Gottschalk, J., Meyer, C., & Beeco, J. A.",
      title: "Pavement treatment type influences visitor experiences related to vehicular road sound in Death Valley National Park",
      journal: "Journal of Ecotourism",
      volume: "20",
      issue: "3",
      pages: "211-223",
      year: "2021",
      pdfUrl: "assets/pdf/Miller_et_al_2021.pdf"
    },
    {
      authors: "Rice, W. L., Newman, P., Miller, Z. D., & Taff, B. D.",
      title: "Protected areas and noise abatement: A spatial approach",
      journal: "Landscape and Urban Planning",
      volume: "194",
      pages: "103701",
      year: "2020",
      pdfUrl: "assets/pdf/Rice_et_al_2020.pdf"
    },
    {
      authors: "Rice, W. L., Newman, P., Zipp, K. Y., Taff, B. D., Pipkin, A. R., Miller, Z. D., & Pan, B.",
      title: "Balancing quietness and freedom: Support for reducing road noise among park visitors",
      journal: "Journal of Outdoor Recreation and Tourism",
      volume: "37",
      pages: "100474",
      year: "2022",
      pdfUrl: "assets/pdf/Rice_et_al_2022.pdf"
    },
    {
      authors: "Pilcher, E. J., Newman, P., & Manning, R. E.",
      title: "Understanding and managing experiential aspects of soundscapes at Muir Woods National Monument",
      journal: "Environmental Management",
      volume: "43",
      pages: "425–35",
      year: "2009",
      doi: "https://doi.org/10.1007/s00267-008-9224-1"
    },
    {
      authors: "Selleck, J., & KellerLynn, K.",
      title: "Integrating Research and Resource Management in the National Parks",
      journal: "Special Issue: From landscapes to soundscapes: Park Science",
      volume: "26",
      issue: "3",
      year: "2010"
    },
    {
      authors: "Stack, D. W., Newman, P., Manning, R. E., & Fristrup, K. M.",
      title: "Reducing visitor noise levels at Muir Woods National Monument using experimental management",
      journal: "The Journal of the Acoustical Society of America",
      volume: "129",
      issue: "3",
      pages: "1375–1380",
      year: "2011",
      doi: "https://doi.org/10.1121/1.3531803"
    },
    {
      authors: "Taff, D., Newman, P., Lawson, S. R., Bright, A., Marin, L., Gibson, A., & Archie, T.",
      title: "The role of messaging on acceptability of military aircraft sounds in Sequoia National Park",
      journal: "Applied Acoustics",
      volume: "84",
      pages: "122–128",
      year: "2014",
      doi: "https://doi.org/10.1016/j.apacoust.2013.09.012"
    },
    {
      authors: "Weinzimmer, D., Newman, P., Taff, D., Benfield, J., Lynch, E., & Bell, P.",
      title: "Responses to Simulated Motorized Noise in National Parks",
      journal: "Leisure Sciences",
      volume: "36",
      issue: "3",
      pages: "251–267",
      year: "2014",
      doi: "https://doi.org/10.1080/01490400.2014.888022"
    }
  ],
  
  bibliographyPdfUrl: "assets/pdf/Soundboard_Bibliography.pdf",
  downloadText: "For a complete list of resources, download the bibliography from the link below:"
};