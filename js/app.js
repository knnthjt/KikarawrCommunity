/**
 * Kikarawr Community - Interactive JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const shareBtn = document.getElementById('shareBtn');
  const shareModal = document.getElementById('shareModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  const openNewTabBtn = document.getElementById('openNewTabBtn');
  const toastContainer = document.getElementById('toastContainer');
  const blankCards = document.querySelectorAll('.link-card.blank-card');
  const cardOptionBtns = document.querySelectorAll('.card-trailing');

  let activeMenuUrl = window.location.href;
  let activeMenuTitle = document.title;

  /**
   * Display modern toast notification
   */
  function showToast(message, type = 'info', duration = 3200) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'all 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-12px) scale(0.9)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  /**
   * Ripple effect on button click
   */
  function createRipple(event, element) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    const rect = element.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');

    const ripple = element.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    element.appendChild(circle);
  }

  // Attach ripple effect to all clickable cards & CTA buttons
  document.querySelectorAll('.link-card, .bottom-cta-btn, .nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      createRipple(e, btn);
    });
  });

  /**
   * Blank button slots click feedback
   */
  blankCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const slotNum = card.getAttribute('data-slot') || '2';
      showToast(`✨ Button ${slotNum} is blank for now! Edit config.php to add a link.`, 'info');
    });
  });

  /**
   * Share Modal Controls
   */
  function openShareModal(url = window.location.href, title = document.title) {
    activeMenuUrl = url;
    activeMenuTitle = title;

    if (navigator.share && window.innerWidth <= 600) {
      navigator.share({
        title: title,
        url: url
      }).catch((err) => {
        if (err.name !== 'AbortError') {
          shareModal?.classList.add('active');
        }
      });
    } else {
      shareModal?.classList.add('active');
    }
  }

  function closeShareModal() {
    shareModal?.classList.remove('active');
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openShareModal();
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeShareModal);
  }

  if (shareModal) {
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) {
        closeShareModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && shareModal?.classList.contains('active')) {
      closeShareModal();
    }
  });

  /**
   * Copy Link to Clipboard
   */
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(activeMenuUrl);
        showToast('📋 Link copied to clipboard!', 'info');
        closeShareModal();
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = activeMenuUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('📋 Link copied to clipboard!', 'info');
        closeShareModal();
      }
    });
  }

  /**
   * Open in new tab
   */
  if (openNewTabBtn) {
    openNewTabBtn.addEventListener('click', () => {
      window.open(activeMenuUrl, '_blank', 'noopener,noreferrer');
      closeShareModal();
    });
  }

  /**
   * Card trailing options (three dots button)
   */
  cardOptionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // prevent triggering card navigation
      
      const parentCard = btn.closest('.link-card');
      const targetUrl = parentCard?.getAttribute('href') || window.location.href;
      const targetTitle = parentCard?.querySelector('.card-title')?.textContent?.trim() || document.title;
      
      openShareModal(targetUrl, targetTitle);
    });
  });
});
