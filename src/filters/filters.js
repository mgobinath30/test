export const statusFilter = (status) => {
  switch (status) {
    case 0:
      return 'Pending'
    case 1:
      return 'Approved'
    case 2:
      return 'Rejected'
    default:
      return ''
  }
}

export const sliceFilter = (text) => `${text.substring(0, 80)}...`

