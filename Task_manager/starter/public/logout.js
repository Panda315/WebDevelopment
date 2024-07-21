
      document.getElementById('logout').addEventListener('click', async () => {
          try {
              const response = await fetch('/logout', {
                  method: 'POST'
              });
            if(response.status===200)
                    window.location.href = "http://localhost:3000/login"
          } catch (error) {
              console.error('Error:', error);
          }
      });