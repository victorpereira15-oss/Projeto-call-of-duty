document.addEventListener('DOMContentLoaded', () => {
  // Acessibilidade e Tamanho da Fonte
  const btnAumentar = document.getElementById('btnAumentarFonte');
  const btnDiminuir = document.getElementById('btnDiminuirFonte');
  const btnTema = document.getElementById('btnTema');
  let tamanhoFonte = 16;

  if (btnAumentar && btnDiminuir) {
    btnAumentar.addEventListener('click', () => {
      if (tamanhoFonte < 24) {
        tamanhoFonte += 2;
        document.documentElement.style.fontSize = `${tamanhoFonte}px`;
      }
    });

    btnDiminuir.addEventListener('click', () => {
      if (tamanhoFonte > 12) {
        tamanhoFonte -= 2;
        document.documentElement.style.fontSize = `${tamanhoFonte}px`;
      }
    });
  }

  // Alternar Visão Noturna
  if (btnTema) {
    btnTema.addEventListener('click', () => {
      document.body.classList.toggle('night-vision');
      btnTema.textContent = document.body.classList.contains('night-vision')
        ? ' Visão Normal'
        : ' Visão Noturna';
    });
  }

  // Seleção Dinâmica da Cor Neons Principais
  const colorBtns = document.querySelectorAll('.color-btn');
  colorBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedColor = e.target.getAttribute('data-color');
      document.documentElement.style.setProperty('--primary-neon', selectedColor);
    });
  });

  // SIMULADOR 1: Calculadora de K/D e Winrate
  const btnCalcularStats = document.getElementById('btnCalcularStats');
  if (btnCalcularStats) {
    btnCalcularStats.addEventListener('click', () => {
      const kills = parseFloat(document.getElementById('killsInput').value) || 0;
      const deaths = parseFloat(document.getElementById('deathsInput').value) || 0;
      const wins = parseFloat(document.getElementById('winsInput').value) || 0;

      if (deaths === 0 && kills === 0) {
        alert("Insira valores válidos para analisar o perfil.");
        return;
      }

      const kdRatio = deaths > 0 ? (kills / deaths).toFixed(2) : kills.toFixed(2);
      let rank = "Recruta";
      
      if (kdRatio >= 2.0) rank = "Lenda Urbana (Pro Player)";
      else if (kdRatio >= 1.2) rank = "Veterano Experiente";
      else if (kdRatio >= 0.8) rank = "Operador Intermediário";

      const resultadoStats = document.getElementById('resultadoStats');
      const textoStats = document.getElementById('textoStats');

      textoStats.innerHTML = `
        Seu K/D Ratio é <strong>${kdRatio}</strong> com <strong>${wins} vitórias</strong> registradas.<br>
        Classificação Atual: <strong>${rank}</strong>.
      `;
      resultadoStats.classList.remove('hidden');
    });
  }

  // SIMULADOR 2: Calculadora de TTK Dinâmica
  const btnCalcularTTK = document.getElementById('btnCalcularTTK');
  if (btnCalcularTTK) {
    btnCalcularTTK.addEventListener('click', () => {
      const arma = document.getElementById('weaponSelect').value;
      const dist = parseFloat(document.getElementById('distanceInput').value) || 0;

      let baseTTK = 600; // ms
      if (arma === 'ISO-45') baseTTK = dist > 30 ? 720 : 580;
      if (arma === 'BRYSOM-800') baseTTK = dist > 15 ? 850 : 510;
      if (arma === 'SVA 545') baseTTK = dist > 40 ? 680 : 610;
      if (arma === 'KATT-AMR') baseTTK = 0; // Hitkill na cabeça

      const resultadoTTK = document.getElementById('resultadoTTK');
      const textoTTK = document.getElementById('textoTTK');

      if (arma === 'KATT-AMR') {
        textoTTK.innerHTML = `Com a <strong>KATT-AMR</strong> a ${dist}m, um tiro na cabeça resulta em <strong>Hitkill Instantâneo (0ms TTK)</strong>.`;
      } else {
        textoTTK.innerHTML = `O TTK estimado da <strong>${arma}</strong> a <strong>${dist} metros</strong> é de aproximadamente <strong>${baseTTK} milissegundos</strong> no peito/cabeça.`;
      }

      resultadoTTK.classList.remove('hidden');
    });
  }
});