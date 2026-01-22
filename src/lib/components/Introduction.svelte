<script>
  import { onMount } from 'svelte';
  import Footer from '$lib/components/Footer.svelte';

  let bgUrl = ''; // Lazy load the background image

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            bgUrl = '/images/bg-intro.webp'; // load the actual image
            obs.disconnect(); // stop observing after loading
          }
        });
      },
      { rootMargin: '200px' } // preload a bit before it enters viewport
    );

    const el = document.querySelector('.page-inner');
    if (el) observer.observe(el);

    return () => observer.disconnect();
  });
</script>

<section id="introduction" class="">
  <div
    class="page-inner"
    style="background-image: url({bgUrl})"
  >
    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-half">
            <div class="copy">
              <h1>Sounding Board</h1>
              <p class="subheading color-gold">The Science of Sound</p>
              <p>
                Picture yourself standing under the stillness of a sunrise in a
                national park. Although the sun warms your skin and the light
                dances on the landscape, what really captures you is the natural
                quiet that hangs over the setting. A soft wind is heard drifting
                across the ground and through the plants. Perhaps there is a
                stream trickling nearby as the songs of birds greet the morning.
                Here, you are free from the noise of cars, planes, technology -
                and even other people. Here, you feel renewed, healthful, and
                contemplative. This is the power of sound.
              </p>
              <p>
                The unimpaired sounds of our national parks are valued and
                protected resources. This website, called <em>Sounding Board</em
                >, provides information related to the science and management of
                sounds in parks and protected areas. As you browse through the
                pages, you’ll learn about emerging research from a multitude of
                disciplines that details the profound impacts that sounds have
                on ecological and human well-being.
              </p>
              <p>
                This website provides background knowledge on the science of
                sound and its value in parks and protected areas. Read along to
                learn more about this work as well as the efforts of the PARC
                Listening Lab at Penn State University who are working to better
                understand and protect soundscapes of national parks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer nextPage="/physics-of-sound" />
  </div>
</section>




