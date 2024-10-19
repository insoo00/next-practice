export default async function syncData() {
  const storedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');

  if (storedRecipes.length > 0) {
    try {
      const response = await fetch('/api/sync-recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storedRecipes),
      });

      if (response.ok) {
        console.log('Local storage data synced to server');
      } else {
        console.error('Failed to sync local storage data to server');
      }
    } catch (error) {
      console.error('Error syncing local storage data to server:', error);
    }
  }
}
