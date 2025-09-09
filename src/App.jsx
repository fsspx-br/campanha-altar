import { useState, useEffect } from 'react'
import { AltarData } from './AltarData'
import altarImage from './altar.png'
import './styles.css'

function App() {
  const [altarData, setAltarData] = useState(new AltarData())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://gist.githubusercontent.com/rakaramos/ee2c8d58aa0b32338fcadfd92851926c/raw/altar.json?t=${Date.now()}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const jsonData = await response.json()
        setAltarData(AltarData.fromJson(jsonData))
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])


  if (loading) {
    return (
      <div className="app">
        <center>Loading...</center>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <center>Error: {error}</center>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="altar-container">
        <div 
          className="altar-background"
          style={{ 
            '--reveal-percentage': `${altarData.getPercentage()}%`,
            '--altar-image': `url(${altarImage})`
          }}
        >
          {altarData.pixQrCodeImage ? (
            <img src={altarData.pixQrCodeImage} alt="Pix" />
          ) : (
            <div className="no-image"></div>
          )}
        </div>
         <div className="text-container">
          <span>{altarData.getPercentage()}%</span>
          <span>Já foram reunidos cerca de {altarData.getFormattedCurrent()}</span>
         </div>
         </div>
      </div>
  )
}

export default App
