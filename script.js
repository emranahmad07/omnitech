// 1. حساب شريط تقدم القراءة في أعلى الصفحة (Scroll Progress Bar)
const progressBar = document.getElementById('progressBar');

if (progressBar) {
  window.addEventListener('scroll', () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.width = progress + '%';
  });
}

// 2. تأثير حركة البطاقات ثلاثية الأبعاد (3D Perspective Tilt Card Effect)
const cards = document.querySelectorAll('.team-card');

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    
    // حساب موقع الفأرة بالنسبة للبطاقة
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // تحديد نقطة المنتصف للبطاقة
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // حساب زوايا الدوران بناءً على بُعد الفأرة عن المنتصف
    const rotateX = ((y - centerY) / 18) * -1;
    const rotateY = ((x - centerX) / 18);

    // تطبيق الدوران والارتفاع البسيط للأعلى
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
  });

  // إعادة البطاقة لوضعها الطبيعي المستقر عند خروج الفأرة
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';
  });
});

// 3. التحكم بالنوافذ المنبثقة للبورتفوليو (Portfolio Modals Logic)
const portfolioCards = document.querySelectorAll('.portfolio-card');
const closeButtons = document.querySelectorAll('.close-btn');
const modals = document.querySelectorAll('.modal');

// دالة عامة لإغلاق النافذة المنبثقة بحركة ناعمة
function closeModal(modal) {
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 400); 
  }
}

// فتح النافذة المنبثقة المناسبة لكل كرت
portfolioCards.forEach(card => {
  card.addEventListener('click', () => {
    const targetId = card.getAttribute('data-target');
    const targetModal = document.getElementById(targetId);
    if (targetModal) {
      document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
      targetModal.classList.add('show');
    }
  });
});

// إغلاق النافذة عند الضغط على زر (X)
closeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const modal = btn.closest('.modal');
    closeModal(modal);
  });
});

// إغلاق النافذة عند الضغط خارج صندوق المحتوى
window.addEventListener('click', (e) => {
  modals.forEach(modal => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

// إغلاق النافذة عند الضغط على زر Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.modal.show');
    if (activeModal) {
      closeModal(activeModal);
    }
  }
});
