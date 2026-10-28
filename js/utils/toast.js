function showToast(message) {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toast-message');
    msgEl.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 3000);
}
