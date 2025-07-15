import { useState } from 'react'
import { Bar } from 'react-chartjs-2'

export const DashboardChart = ({ tasks, board }) => {
  const [dataType, setDataType] = useState('label')

  const chartLabels = []
  const chartData = []
  const chartColors = []

  const generateColor = (index) => {
    const colors = [
      '#4e79a7', '#f28e2b', '#e15759', '#76b7b2',
      '#59a14f', '#edc948', '#b07aa1', '#ff9da7',
      '#9c755f', '#bab0ab'
    ]
    return colors[index % colors.length]
  }

  switch (dataType) {
    case 'label': {
      const labelsIdMap = board.labels.reduce((acc, label) => {
        acc[label.id] = 0
        return acc
      }, {})
      tasks.forEach(task =>
        task.labelIds.forEach(labelId => {
          labelsIdMap[labelId] += 1
        })
      )

      for (const labelId in labelsIdMap) {
        const label = board.labels.find(label => label.id === labelId)
        chartLabels.push(label?.title || `Unknown (${labelId})`)
        chartData.push(labelsIdMap[labelId])
        chartColors.push(label?.color || generateColor(chartLabels.length))
      }
      break
    }

    case 'group': {
      board.groups.forEach(group => {
        chartLabels.push(group.title)
        chartData.push(group.tasks.length)
        chartColors.push(generateColor(chartLabels.length))
      })
      break
    }

    case 'member': {
      const membersMap = new Map(board.members.map(m => [m._id, m]))
      const membersIdMap = {}

      // ספור לפי משימות
      tasks.forEach(task => {
        task.members.forEach(member => {
          if (!membersIdMap[member._id]) {
            membersIdMap[member._id] = 0
          }
          membersIdMap[member._id] += 1

          if (!membersMap.has(member._id)) {
            membersMap.set(member._id, {
              _id: member._id,
              fullname: member.fullname || member.username || `Unknown (${member._id})`
            })
          }
        })
      })

      board.members.forEach(member => {
        if (!membersIdMap[member._id]) {
          membersIdMap[member._id] = 0
        }
      })

      let idx = 0
      for (const memberId in membersIdMap) {
        const member = membersMap.get(memberId)
        const name = member?.fullname || member?.username || `Unknown (${memberId})`

        chartLabels.push(name)
        chartData.push(membersIdMap[memberId])
        chartColors.push(generateColor(idx))
        idx++
      }
      break
    }

    default:
      break
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: true }
    },
    ...(dataType === 'member' && {
      indexAxis: 'y', // Horizontal bar for members
      scales: {
        x: { beginAtZero: true, ticks: { stepSize: 1 } }
      }
    })
  }

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Tasks',
        data: chartData,
        backgroundColor: chartColors,
        borderRadius: 3
      }
    ]
  }

  return (
    <div className="dashboard-chart">
      <header className="chart-header">
        <h1 className="title">Tasks per {dataType}</h1>
        <nav className="chart-options">
          <button disabled={dataType === 'label'} onClick={() => setDataType('label')}>Label</button>
          <button disabled={dataType === 'group'} onClick={() => setDataType('group')}>Group</button>
          <button disabled={dataType === 'member'} onClick={() => setDataType('member')}>Member</button>
        </nav>
      </header>
      <div className="graph-container">
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}
