<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Chart from 'chart.js/auto';
  
  import Footer from '$lib/components/Footer.svelte';

  let exiting = false;
  let chartInstance = null;

  async function handlePageTransition(event) {
    event.preventDefault();

    const url = event.currentTarget.getAttribute("href");

    exiting = true;
    await new Promise((r) => setTimeout(r, 500));

    goto(url);
  }

  onMount(() => {
    createChart();
    setupAudioButtons();
  });



const axisTickPlugin = {
  id: "axisTickPlugin",
  afterDraw(chart) {
    const { ctx, scales, chartArea } = chart;

    const { left, bottom } = chartArea;
    const tickSize = 10;

    ctx.save();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1;

    /* ===== Y-AXIS TICKS (start EXACTLY from Y-axis, go RIGHT) ===== */
    const yScale = scales.y;
    if (yScale) {
      yScale.ticks.forEach((_, i) => {
        const y = yScale.getPixelForTick(i);

        ctx.beginPath();
        ctx.moveTo(left, y);                 
        ctx.lineTo(left + tickSize, y);     
        ctx.stroke();
      });
    }

    /* ===== X-AXIS TICKS (start EXACTLY from X-axis, go UP) ===== */
    const xScale = scales.x;
    if (xScale) {
      xScale.ticks.forEach((_, i) => {
        const x = xScale.getPixelForTick(i);

        ctx.beginPath();
        ctx.moveTo(x, bottom);               
        ctx.lineTo(x, bottom - tickSize);    
        ctx.stroke();
      });
    }

    ctx.restore();
  }
};







function createChart() {
  const canvas = document.getElementById("soundChart");
  if (!canvas) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(canvas.getContext("2d"), {
    type: "line",

    plugins: [axisTickPlugin], 

    data: {
      labels: [
        "Threshold of human hearing",
        "Volcano crater",
        "Leaves rustling",
        "Crickets at 5m",
        "Casual speech at 5m",
        "Motorcycle at 30m",
        "Thunder",
        "Military jet at 100m AGL",
        "Cannon fire at 150m",
      ],
      datasets: [
        {
          data: [0, 20, 30, 45, 60, 85, 110, 130, 140],
          backgroundColor: "rgba(160, 82, 45, 0.95)",
          borderColor: "#FFA500",
          borderWidth: 3,
          pointRadius: 5,
          pointBackgroundColor: "#FFA500",
          pointBorderColor: "#FFA500",
          pointHoverRadius: 6,
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 150,
          border: {
            display: true,
            color: "#ffffff",
            width: 1,
          },
          grid: {
            display: false,
          },
          ticks: {
            stepSize: 30,
            color: "#FFFFFF",
            callback: (value) => value + " dB",
            font: {
              size: 11,
              weight: "bold",
            },
            padding: 3,
            z: 1,
          },
          title: {
            display: true,
            text: "Decibels (dB)",
            color: "#FFFFFF",
            font: {
              size: 12,
              weight: "bold",
            },
            padding: {
              top: 5,
              bottom: 10,
            },
          },
        },
        x: {
          border: {
            display: true,
            color: "#ffffff",
            width: 1,
          },
          grid: {
            display: false,
          },
          ticks: {
            display: false,
            z: 1,
          },
          offset: true,
        },
      },
      layout: {
        padding: {
          left: -5,
          right: 10,
          top: 5,
          bottom: 5,
        },
      },
    },
  });
}




  function setupAudioButtons() {
    const audioButtons = document.querySelectorAll(".sound-effect__button");

    function setActiveButton(activeButton) {
      audioButtons.forEach((btn) => {
        if (btn === activeButton) {
          btn.style.backgroundColor = "red";
        } else {
          btn.style.backgroundColor = "#FF931E";
        }
      });
    }

    audioButtons.forEach((button) => {
      const playSpan = button.querySelector(".play");
      const pauseSpan = button.querySelector(".pause");
      const soundEffect = button.closest(".sound-effect");
      const audio = soundEffect?.querySelector("audio");

      if (!audio) return;

      pauseSpan.style.display = "none";

      button.addEventListener("click", function () {
        if (audio.paused) {
          document.querySelectorAll("audio").forEach((a) => {
            a.pause();
            a.currentTime = 0;
          });

          audioButtons.forEach((btn) => {
            btn.querySelector(".play").style.display = "flex";
            btn.querySelector(".pause").style.display = "none";
          });

          audio.play();
          playSpan.style.display = "none";
          pauseSpan.style.display = "flex";
          pauseSpan.style.textAlign = "center";

          setActiveButton(button);
        } else {
          audio.pause();
          playSpan.style.display = "flex";
          pauseSpan.style.display = "none";
          button.style.backgroundColor = "#FF931E";
        }
      });

      audio.addEventListener("ended", function () {
        playSpan.style.display = "flex";
        pauseSpan.style.display = "none";
        button.style.backgroundColor = "#FF931E";
      });
    });

    document.querySelectorAll(".sound-effect__warning").forEach((icon) => {
      icon.setAttribute("title", "Warning: Sound above 85dB");
    });
  }
</script>

<section id="physics-of-sound" class="physics-of-sound">
  <div class="page-inner">
    <div class="page-content">
      <div class="section--1">
        <div class="image-wrapper">
          <img
            height="408"
            width="100%"
            loading="lazy"
            src="/images/bg-stars@2x.jpg"
          />
          <div class="container">
            <header class="page-header">
              <h1 class="page-title">Physics Of Sound</h1>
              <div class="sub-title">
                Sound is created by pressure variations that move in waves
                through a medium such as air or water. It is measured in terms
                of frequency and amplitude.
              </div>
            </header>
          </div>
        </div>
      </div>

      <div class="section--2">
        <header class="section-header section-header--gold">
          <div class="container">
            <div class="section-header__inner">
              <div class="section-header__name equal">
                <h2 class="section-header__title">Frequency</h2>
                <div class="section-header__subtitle">
                  Measured in hertz <strong>(Hz)</strong>
                </div>
              </div>
              <div class="section-header__summary equal">
                The number of times per second that a <br />sound pressure wave
                repeats itself.
              </div>
            </div>
          </div>
        </header>
        <div class="container">
          <div class="row">
            <div class="col">
              <figure class="image">
                <img
                  width="350"
                  height="90"
                  loading="lazy"
                  src="/images/drum@2x.png"
                  alt=""
                />
                <figcaption class="image__caption">
                  A drum beat has a lower frequency than a whistle
                </figcaption>
              </figure>
            </div>
            <div class="col">
              <figure class="image">
                <img
                  width="350"
                  height="90"
                  loading="lazy"
                  src="/images/cricket@2x.png"
                  alt=""
                />
                <figcaption class="image__caption">
                  A cricket has a higher frequency than a bullfrog call
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>

      <div class="section--3">
        <header class="section-header section-header--orange">
          <div class="container">
            <div class="section-header__inner">
              <div class="section-header__name equal">
                <h2 class="section-header__title">AMPLITUDE</h2>
                <div class="section-header__subtitle">
                  Measured in decibels <strong>(dB)</strong>
                </div>
              </div>
              <div class="section-header__summary equal">
                The relative strength of sound waves, <br />which we perceive as
                loudness or volume.
              </div>
            </div>
          </div>
        </header>
        <div class="container">
          <div class="chart" id="chartContainer">
            <canvas
              id="soundChart"
              width="1250"
              height="325"
              style="display: block; width: 1250px; height: 325px;"
              class="chartjs-render-monitor"
            ></canvas>

            <div class="ct-chart"></div>
          </div>
          <div class="sound-effects">
            <div class="sound-effect sound-effect--ear">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-ear.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="65" src=""></audio>
              <div class="sound-effect__title">
                <strong>Threshold of human hearing</strong>
              </div>
            </div>
            <div class="sound-effect sound-effect--volcano">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-volcano.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="83" src="/audio/Uau_HAL.mp3"></audio>
              <div class="sound-effect__title">
                <strong>Volcano <br />crater</strong>
                <em>(Haleakala National Park)</em>
              </div>
            </div>
            <div class="sound-effect sound-effect--leaves">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-leaves.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="68" src="/audio/WindRustlingLeaves.mp3"></audio>
              <div class="sound-effect__title">
                <strong>Leaves <br />rustling</strong>
                <em>(Canyonlands National Park)</em>
              </div>
            </div>
            <div class="sound-effect sound-effect--crickets">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-cricket.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="70" src="/audio/crickets.mp3"></audio>
              <div class="sound-effect__title">
                <strong>Crickets <br />at 5m</strong>
                <em>(Zion National Park)</em>
              </div>
            </div>
            <div class="sound-effect sound-effect--speech">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-lips.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="71" src=""></audio>
              <div class="sound-effect__title">
                <strong>Casual speech <br />at 5m</strong>
                <em>(Whitman Mission National Historic Park)</em>
              </div>
            </div>
            <div class="sound-effect sound-effect--motorcycle">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-motorcycle.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="72" src="/audio/motorcycle.mp3"></audio>
              <div class="sound-effect__title">
                <strong>Motorcycle <br />at 30m</strong>
                <em>(Yellowstone National Park)</em>
              </div>
            </div>
            <div class="sound-effect sound-effect--thunder">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-thunder.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="74" src="/audio/Featured_Thunder.mp3"></audio>
              <div class="sound-effect__title">
                <strong>Thunder</strong> <em>(Arches National Park)</em>
              </div>
              <div class="sound-effect__warning">
                <img src="/icons/Icon_Alert.svg" width="18px">
              </div>
            </div>
            <div class="sound-effect sound-effect--jet">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-jet.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="75" src="/audio/military-jet.mp3"></audio>
              <div class="sound-effect__title">
                <strong>Military jet <br />at 100m AGL</strong>
                <em>(Yukon-Charley Rivers National Park)</em>
              </div>
              <div class="sound-effect__warning">
                <img src="/icons/Icon_Alert.svg" width="18px">
              </div>
            </div>
            <div class="sound-effect sound-effect--cannon">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-cannon.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="76" src=""></audio>
              <div class="sound-effect__title">
                <strong>Cannon fire <br />at 150m</strong>
                <em>(Vicksburg National Military Park)</em>
              </div>
              <div class="sound-effect__warning">
                <img src="/icons/Icon_Alert.svg" width="18px">
              </div>
            </div>
          </div>

          <footer class="section-footer">
            <div class="textblock">
              <h3>Click on the icons above to hear the sounds live</h3>
              <p>
                <img src="/icons/Icon_Alert.svg" width="18px" class="s-Qc5YxSxN_7mj"> <small
                  >Sounds above 85dB are considered harmful if exposed for long
                  periods of time. Exercise caution when listening to sound
                  clips with the caution icon.</small
                >
              </p>
            </div>
          </footer>
        </div>
      </div>

      <div
        class="section--4"
        style="background-image: url(/images/bg-aurora@2x.png)"
      >
        <header class="section-header section-header--purple">
          <div class="container">
            <div class="section-header__inner">
              <div class="section-header__name equal">
                <h2 class="section-header__title">Decibels</h2>
              </div>
              <div class="section-header__summary equal">
                <h4>
                  A small change in decibels means a big change in loudness.
                </h4>
                <p>
                  That’s because decibels work on a logarithmic scale. An
                  increase of 10dB represents <br />a ten-fold increase in sound
                  level, which causes perceived loudness to double.
                </p>
              </div>
            </div>
          </div>
        </header>
        <div class="container">
          <table class="table">
            <thead>
              <tr>
                <th>Decibel Level</th>
                <th>Sound Level/Intensity</th>
                <th>Perceived Loudness</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="db-level">20 <span class="thin">dB</span></td>
                <td class="s-level">
                  <div>
                    <img
                      loading="lazy"
                      src="/icons/icon-music.svg"
                      width="60"
                      height="60"
                    /> <span class="symbol"><img src="/icons/Icon_x.svg" width="18px"></span> 100
                    <span class="metric">(10<sup>2</sup>)</span>
                  </div>
                </td>
                <td class="p-level">
                  <div>
                    <img
                      loading="lazy"
                      src="/icons/icon-music.svg"
                      width="60"
                      height="60"
                    /> <span class="symbol"><img src="/icons/Icon_x.svg" width="18px"></span> 2
                  </div>
                </td>
              </tr>
              <tr>
                <td class="db-level">30 <span class="thin">dB</span></td>
                <td class="s-level">
                  <div>
                    <img
                      loading="lazy"
                      src="/icons/icon-music.svg"
                      width="60"
                      height="60"
                    /> <span class="symbol"><img src="/icons/Icon_x.svg" width="18px"></span> 1000
                    <span class="metric">(10<sup>3</sup>)</span>
                  </div>
                </td>
                <td class="p-level">
                  <div>
                    <img
                      loading="lazy"
                      src="/icons/icon-music.svg"
                      width="60"
                      height="60"
                    /> <span class="symbol"><img src="/icons/Icon_x.svg" width="18px"></span> 4
                  </div>
                </td>
              </tr>
              <tr>
                <td class="db-level">40 <span class="thin">dB</span></td>
                <td class="s-level">
                  <div>
                    <img
                      loading="lazy"
                      src="/icons/icon-music.svg"
                      width="60"
                      height="60"
                    /> <span class="symbol"><img src="/icons/Icon_x.svg" width="18px"></span> 10000
                    <span class="metric">(10<sup>4</sup>)</span>
                  </div>
                </td>
                <td class="p-level">
                  <div>
                    <img
                      loading="lazy"
                      src="/icons/icon-music.svg"
                      width="60"
                      height="60"
                    /> <span class="symbol"><img src="/icons/Icon_x.svg" width="18px"></span> 8
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="textblock">
            <p>
              If 1 vacuum cleaner measures 70dB than 80dB equals 10 vacuum
              cleaners.
            </p>
          </div>

          <div class="bar-charts">
            <div class="bar-chart">
              <div class="bar-chart__label">70 <span>dB</span></div>
              <div class="bar-chart__seperator">=</div>
              <div class="bar-chart__value" style="width: 58px;"></div>
            </div>

            <div class="bar-chart">
              <div class="bar-chart__label">80 <span>dB</span></div>
              <div class="bar-chart__seperator">=</div>
              <div class="bar-chart__value" style="width: 580px;"></div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="section--5"
        style="background-image: url(/images/bg-car@2x.png)"
      >
        <div class="section-title"><span>How Sounds Travel</span></div>
        <header class="section-header section-header--gold">
          <div class="container">
            <div class="section-header__inner">
              <div class="section-header__name equal">
                <h2 class="section-header__title">Propagation</h2>
              </div>
              <div class="section-header__summary equal">
                How a sound wave travels outward from the <br />source, through
                a medium, like air or water.
              </div>
            </div>
          </div>
        </header>

        <div class="container">
          <div class="callout">
            <div class="callout__title">
              Noise levels in park transportation corridors today are at <strong
                >1000 times the natural level</strong
              >.
            </div>
            <div class="callout__image">
              <img
                width="430"
                height="302"
                loading="lazy"
                src="/images/noise-level@2x.png"
              />
            </div>
            <div class="callout__note">
              <em
                >*For illustrated purposes only and not an accurate
                representation of scale.</em
              >
            </div>
          </div>
          <div class="callout">
            <div class="callout__title">
              Road noise impacts on wildlife have been shown to extend <strong
                >over a mile into the forest</strong
              > (Brumm 2004).
            </div>
            <div class="callout__image">
              <img
                width="430"
                height="275"
                loading="lazy"
                src="/images/road-noise@2x.png"
              />
            </div>
            <div class="callout__note">
              <em
                >*For illustrated purposes only and not an accurate
                representation of scale.</em
              >
            </div>
          </div>
        </div>

        <div class="section--keywords">
          <header class="title-line">
            <div class="container">
              <h2 class="title-line__title">Key Words</h2>
            </div>
          </header>

          <div class="container">
            <div class="row">
              <div class="col">
                <div class="keyword">
                  <div class="keyword__word">ACOUSTIC RESOURCES</div>
                  <div class="keyword__definition">
                    Physical sound sources including natural sounds (wind,
                    water, wildlife, vegetation) and cultural and historic
                    sounds (battle reenactments, tribal ceremonies, etc).
                  </div>
                </div>
                <div class="keyword">
                  <div class="keyword__word">SOUNDSCAPE</div>
                  <div class="keyword__definition">
                    The human, or animal, perception of all combined acoustic
                    resources.
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="keyword">
                  <div class="keyword__word">ACOUSTIC ZONES</div>
                  <div class="keyword__definition">
                    Areas with similar vegetation, terrain, animals, and weather
                    likely have similar acoustic characteristics, including
                    sound sources and sound characteristics. Acoustic zones may
                    be based on existing management zones.
                  </div>

                  <div class="keyword__callout">
                    <img
                      width="180"
                      height="105"
                      loading="lazy"
                      src="/images/zion@2x.png"
                    />
                    <div class="keyword__callout__content">
                      Zion National Park has different <span class="special"
                        >7</span
                      > unique Acoustic Zones
                    </div>
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="keyword">
                  <div class="keyword__word">NOISE FREE INTERVAL</div>
                  <div class="keyword__definition">
                    The period of time between noise events, during which no
                    human-cause sounds are audible.
                  </div>

                  <div class="keyword__callout big">
                    <img
                      width="73"
                      height="85"
                      class="stopwatch"
                      src="/images/stopwatch@2x.png"
                    />
                    <div class="keyword__callout__content">
                      In a transportation<br /> corridor, the noise free<br />
                      interval can be as small as<br /> seconds
                      <span class="special">30</span> during high traffic times!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer nextPage="/spectrogram" />
  </div>
</section>

<style>
  .footer-arrow-img {
    display: inline-block;
    margin-left: 13px;
    margin-top: 19px;
  }
  :global(body) {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 0.6s ease,
      transform 0.6s ease;
  }

  :global(body.page-exit) {
    opacity: 0;
    transform: translateY(-12px);
  }

  .page-exit {
    animation: fadeUp 0.5s ease forwards;
  }

  @keyframes fadeUp {
    to {
      opacity: 0;
      transform: translateY(-16px);
    }
  }
</style>
