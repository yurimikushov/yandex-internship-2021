module.exports = function ({ participants, sports }) {
  /**
   * Подобно оператору new создает экземпляр объекта,
   * используя функцию-конструктор и параметры для нее
   */
  function constructFrom(fnConstructor, ...params) {
    return new fnConstructor(...params)
  }

  /**
   * Создает пары вида [’вид спорта’, ’имя участника’],
   * где первому виду спорта соответствует последний участник
   */
  function assignParicipants() {
    const orderParticipantsIndexes = [...this.sports.keys()].reverse()

    return orderParticipantsIndexes.map((participantIndex, sportIndex) => {
      return [this.sports[sportIndex], this.participants[participantIndex]]
    })
  }

  function Contest(participants, sports) {
    this.participants = participants
    this.sports = sports
  }

  Contest.prototype.assignParicipants = assignParicipants

  const contest = constructFrom(Contest, participants, sports)

  return contest.assignParicipants()
}
