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












#physics-of-sound {
  color: #ffffff; }
  #physics-of-sound .page-content {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column; }
  #physics-of-sound .page-header {
    text-align: center;
    padding: 91px 0 200px; }
  #physics-of-sound .page-title {
    font-size: 52px;
    letter-spacing: 0.2em;
    margin: 0 0 39px;
    font-weight: 800;
    text-transform: uppercase;
    color: #000000; }
  #physics-of-sound .sub-title {
    font-size: 16px;
    line-height: 22px;
    max-width: 480px;
    margin: 0 auto;
    font-weight: 600; }
  #physics-of-sound .section-header {
    position: relative; }
    #physics-of-sound .section-header:before, #physics-of-sound .section-header:after {
      content: '';
      display: block;
      height: 100%;
      position: absolute;
      z-index: 0;
      background-repeat: no-repeat; }
    #physics-of-sound .section-header .container {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      min-height: 250px;
      position: relative;
      z-index: 10; }
    #physics-of-sound .section-header__inner {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex; }
    #physics-of-sound .section-header__name {
      padding-right: 35px;
      text-align: right;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      -webkit-box-flex: 1;
          -ms-flex: 1;
              flex: 1;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column; }
    #physics-of-sound .section-header__title {
      font-weight: 700;
      font-size: 36px;
      line-height: 42px;
      margin: -4px 0 0;
      color: #ffffff;
      text-transform: uppercase; }
    #physics-of-sound .section-header__subtitle, #physics-of-sound .section-header__summary {
      font-size: 14px;
      line-height: 19px;
      font-weight: 600; }
    #physics-of-sound .section-header__subtitle {
      text-transform: uppercase;
      letter-spacing: 0.3em;
      margin: 6px 0 0;
      white-space: nowrap; }
      #physics-of-sound .section-header__subtitle strong {
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: none; }
    #physics-of-sound .section-header__summary {
      line-height: 18px;
      padding-left: 35px;
      border-left: 1px solid #ffffff;
      min-width: 360px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      -webkit-box-flex: 6;
          -ms-flex: 6;
              flex: 6;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column; }
      #physics-of-sound .section-header__summary h4 {
        margin: 0 0 20px;
        font-size: 16px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.2em; }
      #physics-of-sound .section-header__summary p {
        margin: 0;
        font-size: 14px;
        line-height: 18px;
        font-weight: 600; }
    #physics-of-sound .section-header--gold:after {
      background-image: url("/images/soundwave_yellow-bgremove.png");
      background-size: 320%;
      background-position: left center;
      width: 36%;
      top: 44%;
      -webkit-transform: translateY(-50%);
              transform: translateY(-50%);
      right: 0; }
    #physics-of-sound .section-header--orange:before {
      background-image: url("/images/NL_soundwave_orange.webp");
      background-size: 170%;
      background-position: right center;
      width: 36%;
      top: 52%;
      -webkit-transform: translateY(-50%);
              transform: translateY(-50%);
      left: 0; }
  #physics-of-sound .title-line {
    margin-bottom: 57px; }
    #physics-of-sound .title-line__title {
      text-transform: uppercase;
      font-size: 32px;
      font-weight: 800;
      margin: 0;
      position: relative; }
      #physics-of-sound .title-line__title:after {
        content: '';
        display: block;
        width: 80%;
        height: 1px;
        background-color: #ffffff;
        position: absolute;
        top: 50%;
        margin-top: -.5px;
        right: 0; }
  #physics-of-sound .callout {
    background: rgba(0, 0, 0, 0.44);
    width: 530px;
    border-radius: 40px;
    padding: 50px;
    margin-bottom: 40px; }
    #physics-of-sound .callout:last-child {
      margin-bottom: 0; }
    #physics-of-sound .callout__title {
      font-size: 14px;
      line-height: 22px;
      font-weight: 600;
      margin-bottom: 31px; }
      #physics-of-sound .callout__title strong {
        font-weight: 800; }
    #physics-of-sound .callout__image {
      margin-bottom: 6px; }
    #physics-of-sound .callout__note {
      font-size: 11px;
      line-height: 15.5px; }
  #physics-of-sound .keyword {
    margin-bottom: 43px; }
    #physics-of-sound .keyword:last-child {
      margin-bottom: 0; }
    #physics-of-sound .keyword__word {
      font-size: 18px;
      line-height: 28px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      font-weight: 600;
      margin-bottom: 8px; }
    #physics-of-sound .keyword__definition {
      font-weight: 600;
      font-size: 14px;
      line-height: 21px; }
    #physics-of-sound .keyword__callout {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      padding: 10px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      margin-top: 17px; }
      #physics-of-sound .keyword__callout.big {
        padding: 20px; }
      #physics-of-sound .keyword__callout img {
        border-radius: 13px;
        margin-right: 15px;
        max-width: 180px; }
        #physics-of-sound .keyword__callout img.stopwatch {
          max-width: 73px;
          margin: 0 15px 0 10px; }
      #physics-of-sound .keyword__callout__content {
        font-size: 14px;
        line-height: 21px;
        font-style: italic;
        margin-top: -3px; }
        #physics-of-sound .keyword__callout__content .special {
          font-size: 50px;
          font-weight: 800;
          float: left;
          font-style: normal;
          margin-top: 10px;
          margin-right: 7px; }
  #physics-of-sound .sound-effects {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justofy-content: space-between;
    padding-left: 71px; }
  #physics-of-sound .sound-effect {
    text-align: center;
    padding: 18px 10px 0;
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    position: relative;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease; }
    #physics-of-sound .sound-effect.active, #physics-of-sound .sound-effect:hover {
      background: rgba(255, 255, 255, 0.25); }
      #physics-of-sound .sound-effect.active:before, #physics-of-sound .sound-effect:hover:before {
        content: '';
        display: block;
        height: 269px;
        width: 100%;
        position: absolute;
        bottom: 100%;
        left: 0;
        background: inherit;
        -webkit-transition: all 150ms ease;
        transition: all 150ms ease; }
    #physics-of-sound .sound-effect__icon {
      height: 32px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      margin-bottom: 14px; }
    #physics-of-sound .sound-effect__button {
      background-color: #FF931E;
      color: #ffffff;
      -webkit-transition: all 150ms ease;
      transition: all 150ms ease;
      border: 2px solid transparent;
      cursor: pointer;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      line-height: 1;
      display: inline-block;
      padding: 3px 8px 1px;
      border-radius: 50px;
      letter-spacing: 0.1em;
      margin-bottom: 18px; }
      #physics-of-sound .sound-effect__button i {
        margin-right: 2px;
        color: #ffffff; }
      #physics-of-sound .sound-effect__button span.arrow {
        font-size: 15px;
        top: 1px;
        position: relative;
        margin-left: 6px;
        line-height: 0;
        color: #ffffff; }
      #physics-of-sound .sound-effect__button:hover {
        color: #000000;
        text-decoration: none; }
        #physics-of-sound .sound-effect__button:hover i,
        #physics-of-sound .sound-effect__button:hover .span.arrow {
          color: #ffffff; }
      #physics-of-sound .sound-effect__button:focus {
        outline: none; }
      #physics-of-sound .sound-effect__button.playing {
        background-color: #ED2024; }
        #physics-of-sound .sound-effect__button.playing .play {
          display: none; }
        #physics-of-sound .sound-effect__button.playing .pause {
          display: block; }
      #physics-of-sound .sound-effect__button .pause {
        display: none;
       align-items: center;
      }
        #physics-of-sound .sound-effect__button .pause i {
          margin-right: 3px;
          margin-left: -3px; }
    #physics-of-sound .sound-effect__title {
      font-size: 14px;
      line-height: 15.5px; }
      #physics-of-sound .sound-effect__title strong {
        font-weight: 700; }
      #physics-of-sound .sound-effect__title em {
        font-size: 11px;
        display: block; }
    #physics-of-sound .sound-effect__warning {
      margin-top: 8px; }
    #physics-of-sound .sound-effect--ear img {
      height: 35px; }
    #physics-of-sound .sound-effect--volcano img {
      height: 32px; }
    #physics-of-sound .sound-effect--leaves img {
      height: 45px; }
    #physics-of-sound .sound-effect--crickets img {
      height: 37px; }
    #physics-of-sound .sound-effect--speech img {
      height: 18px; }
    #physics-of-sound .sound-effect--motorcycle img {
      height: 32px; }
    #physics-of-sound .sound-effect--thunder img {
      height: 46px; }
    #physics-of-sound .sound-effect--jet img {
      height: 35px; }
    #physics-of-sound .sound-effect--cannon img {
      height: 33px; }
  #physics-of-sound .ct-series-a .ct-line {
    /* Set the colour of this series line */
    stroke: #FF931E;
    /* Control the thikness of your lines */
    stroke-width: 2px;
    /* Create a dashed line with a pattern */ }
  #physics-of-sound .ct-series-a .ct-point {
    /* Colour of your points */
    stroke: #FF931E;
    /* Size of your points */
    stroke-width: 10px;
    /* Make your points appear as squares */ }
  #physics-of-sound .ct-series-a .ct-area {
    fill: #FF931E;
    fill-opacity: .39; }
  #physics-of-sound .ct-grid {
    stroke: #ffffff;
    stroke-dasharray: 0;
    stroke-opacity: 0; }
    #physics-of-sound .ct-grid.ct-horizontal:first-child {
      stroke-opacity: 1; }
    #physics-of-sound .ct-grid.ct-vertical:first-of-type {
      stroke-opacity: 1; }
  #physics-of-sound .ct-axis-title {
    color: #ffffff;
    fill: #ffffff; }
  #physics-of-sound .ct-label {
    fill: #ffffff;
    color: #ffffff; }
  #physics-of-sound table {
    padding-left: 70px;
    margin-bottom: 36px; }
  #physics-of-sound thead th {
    text-align: center;
    letter-spacing: 0.25em;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    border-right: 1px solid #ffffff;
    border-bottom: 1px solid #ffffff;
    vertical-align: middle;
    padding: 0 0 23px; }
    #physics-of-sound thead th:last-child {
      border-right: 0; }
  #physics-of-sound tr:last-child td {
    border-bottom: 0; }
  #physics-of-sound td {
    font-family: "Coda-n8", "Coda", sans-serif;
    font-style: normal;
    font-weight: 800;
    font-size: 1.875em;
    border-right: 1px solid #ffffff;
    border-bottom: 1px solid #ffffff;
    vertical-align: middle;
    text-align: center;
    padding: 30px 0; }
    #physics-of-sound td:last-child {
      border-right: 0; }
  #physics-of-sound .symbol {
    font-size: 30px;
    font-weight: 400;
    margin: 0 6px; }
  #physics-of-sound .db-level {
    font-size: 50px;
    width: 250px; }
    #physics-of-sound .db-level .thin {
      font-size: 33px;
      font-weight: 400; }
  #physics-of-sound .s-level {
    font-size: 30px;
    text-align: left;
    width: 415px;
    padding-left: 70px; }
    #physics-of-sound .s-level * {
      vertical-align: middle; }
    #physics-of-sound .s-level img {
      height: 60px; }
    #physics-of-sound .s-level .metric {
      font-family: "Open Sans-n4", "Open Sans", "Lucida Grande", Tahoma, Verdana, Arial, sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      position: relative;
      top: 3px; }
  #physics-of-sound .p-level {
    width: 340px;
    font-size: 30px; }
    #physics-of-sound .p-level * {
      vertical-align: middle; }
  #physics-of-sound .bar-charts {
    padding-left: 135px;
    position: relative;
    z-index: 15; }
  #physics-of-sound .bar-chart {
    margin-bottom: 42px; }
    #physics-of-sound .bar-chart:after {
      content: "";
      display: table;
      clear: both; }
    #physics-of-sound .bar-chart:last-child {
      margin-bottom: 0; }
    #physics-of-sound .bar-chart div {
      float: left; }
    #physics-of-sound .bar-chart__label {
      font-family: "Coda-n8", "Coda", sans-serif;
      font-style: normal;
      font-weight: 800;
      font-size: 50px;
      width: 121px; }
      #physics-of-sound .bar-chart__label span {
        font-size: 33px;
        font-weight: 400; }
    #physics-of-sound .bar-chart__seperator {
      font-size: 50px;
      display: inline-block;
      margin: 0 20px 0 18px; }
    #physics-of-sound .bar-chart__value {
      height: 45px;
      /* min-width: 68px; */
      background-image: url("/icons/icon-vaccume.svg");
      background-repeat: repeat-x; }
  #physics-of-sound .section-title {
    font-family: "Coda-n8", "Coda", sans-serif;
    font-style: normal;
    font-weight: 800;
    text-align: center;
    font-size: 46px;
    text-transform: uppercase;
    position: relative;
    margin-top: 95px;
    margin-bottom: -50px; }
    #physics-of-sound .section-title span {
      display: inline-block;
      background: rgba(0, 0, 0, 0.796);
      position: relative;
      z-index: 10;
      -webkit-box-shadow: 0 0 64px 105px rgba(0, 0, 0, 0.7);
              box-shadow: 0 0 64px 105px rgba(0, 0, 0, 0.7);
      padding: 70px 0;
      border-radius: 50px; }
    #physics-of-sound .section-title:before, #physics-of-sound .section-title:after {
      content: '';
      display: block;
      background-image: url("/icons/NL_soundwave_white@2x.png");
      height: 500px;
      width: 50%;
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
              transform: translateY(-50%);
      background-size: cover; }
    #physics-of-sound .section-title:before {
      left: 0;
      background-position: right center; }
    #physics-of-sound .section-title:after {
      right: 0;
      background-position: left center; }
  #physics-of-sound .section--1 {
    position: relative; }
    #physics-of-sound .section--1 .container {
      position: absolute;
      top: 0;
      left: 50%;
      -webkit-transform: translateX(-50%);
              transform: translateX(-50%); }
  #physics-of-sound .section--2 .section-header {
    margin-top: -20px;
    margin-bottom: -32px; }
    #physics-of-sound .section--2 .section-header__inner {
      margin-left: 13%; }
  #physics-of-sound .section--2 .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
        justify-content: space-around;
    max-width: 1000px;
    margin: 0 auto; }
  #physics-of-sound .section--2 .col {
    width: 350px; }
  #physics-of-sound .section--3 {
    margin-top: 20px; }
    #physics-of-sound .section--3 .section-header__inner {
      margin-left: 26%; }
    #physics-of-sound .section--3 .section-footer {
      text-align: center;
      margin-top: 34px; }
      #physics-of-sound .section--3 .section-footer h3 {
        font-size: 16px;
        line-height: 22.5px;
        font-weight: 700; }
      #physics-of-sound .section--3 .section-footer p {
        color: #ffffff;
        margin: 0; }
        #physics-of-sound .section--3 .section-footer p i {
          font-size: 16px;
          margin-right: 6px;
          vertical-align: middle; }
        #physics-of-sound .section--3 .section-footer p small {
          font-size: 12px;
          line-height: 15.5px;
          font-style: italic; }
  #physics-of-sound .section--4 {
    background-size: contain; }
    #physics-of-sound .section--4 .section-header {
      margin-top: 3px;
      margin-bottom: -26px; }
    #physics-of-sound .section--4 .textblock p {
      font-size: 14px;
      line-height: 18px;
      color: #ffffff;
      font-weight: 600; }
  #physics-of-sound .section--5 {
    background-size: cover;
    margin-top: -12px; }
    #physics-of-sound .section--5 .section-header {
      margin-bottom: -50px; }
      #physics-of-sound .section--5 .section-header:after {
        display: none; }
  #physics-of-sound .section--keywords {
    margin: 93px 0 30px; }
    #physics-of-sound .section--keywords .row {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
          -ms-flex-pack: justify;
              justify-content: space-between; }
    #physics-of-sound .section--keywords .col {
      width: 360px; }
      #physics-of-sound .section--keywords .col:first-child {
        width: 290px; }
      #physics-of-sound .section--keywords .col:last-child {
        width: 315px; }
  #physics-of-sound .move-to-next {
    background: rgba(253, 255, 255, 0.4); }

@-webkit-keyframes rotation {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }
  100% {
    -webkit-transform: rotate(270deg);
            transform: rotate(270deg); } }

@keyframes rotation {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }
  100% {
    -webkit-transform: rotate(270deg);
            transform: rotate(270deg); } }

@-webkit-keyframes turn {
  0% {
    stroke-dashoffset: 187; }
  50% {
    stroke-dashoffset: 46.75;
    -webkit-transform: rotate(135deg);
            transform: rotate(135deg); }
  100% {
    stroke-dashoffset: 187;
    -webkit-transform: rotate(450deg);
            transform: rotate(450deg); } }

@keyframes turn {
  0% {
    stroke-dashoffset: 187; }
  50% {
    stroke-dashoffset: 46.75;
    -webkit-transform: rotate(135deg);
            transform: rotate(135deg); }
  100% {
    stroke-dashoffset: 187;
    -webkit-transform: rotate(450deg);
            transform: rotate(450deg); } }

@-webkit-keyframes sonar-animation {
  0% {
    width: 6rem;
    height: 6rem;
    opacity: 0; }
  15% {
    opacity: 1; }
  100% {
    width: 20rem;
    height: 20rem;
    opacity: 0; } }

@keyframes sonar-animation {
  0% {
    width: 6rem;
    height: 6rem;
    opacity: 0; }
  15% {
    opacity: 1; }
  100% {
    width: 20rem;
    height: 20rem;
    opacity: 0; } }

@-webkit-keyframes sprite {
  0% {
    background-position: 0px; }
  100% {
    background-position: -2010px; } }

@keyframes sprite {
  0% {
    background-position: 0px; }
  100% {
    background-position: -2010px; } }

</style>
