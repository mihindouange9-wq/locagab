/* Met les planches (1600 × 1000) à l'échelle de la fenêtre et réserve leur hauteur réelle. */
(function () {
  var cadres = document.querySelectorAll('.planche-cadre');
  function ajuster() {
    var e = Math.min(1, (window.innerWidth - 32) / 1600);
    document.documentElement.style.setProperty('--echelle', e);
    for (var i = 0; i < cadres.length; i++) { cadres[i].style.marginBottom = (-1000 * (1 - e)) + 'px'; }
  }
  ajuster();
  window.addEventListener('resize', ajuster);
})();
