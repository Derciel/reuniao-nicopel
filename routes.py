from flask import Blueprint, request, jsonify
from models import db, Meeting, Room
from datetime import datetime

api = Blueprint('api', __name__)

@api.route('/meetings', methods=['GET'])
def list_meetings():
    room_id = request.args.get('room_id')
    start = request.args.get('start')
    end = request.args.get('end')

    query = Meeting.query
    if room_id:
        query = query.filter_by(room_id=room_id)
    if start and end:
        start_date = datetime.fromisoformat(start)
        end_date = datetime.fromisoformat(end)
        query = query.filter(Meeting.start_time >= start_date, Meeting.end_time <= end_date)

    meetings = query.all()
    return jsonify([{
        'id': m.id,
        'title': m.title,
        'start': m.start_time.isoformat(),
        'end': m.end_time.isoformat(),
        'roomId': m.room_id,
        'roomName': m.room.name
    } for m in meetings])

@api.route('/meetings', methods=['POST'])
def create_meeting():
    data = request.json
    meeting = Meeting(
        title=data['title'],
        start_time=datetime.fromisoformat(data['start']),
        end_time=datetime.fromisoformat(data['end']),
        room_id=data['roomId']
    )
    db.session.add(meeting)
    db.session.commit()
    return jsonify({'message': 'Reunião criada', 'id': meeting.id})

@api.route('/meetings/<int:id>', methods=['PUT'])
def update_meeting(id):
    data = request.json
    meeting = Meeting.query.get_or_404(id)
    meeting.title = data['title']
    meeting.start_time = datetime.fromisoformat(data['start'])
    meeting.end_time = datetime.fromisoformat(data['end'])
    meeting.room_id = data['roomId']
    db.session.commit()
    return jsonify({'message': 'Reunião atualizada'})

@api.route('/meetings/<int:id>', methods=['DELETE'])
def delete_meeting(id):
    meeting = Meeting.query.get_or_404(id)
    db.session.delete(meeting)
    db.session.commit()
    return jsonify({'message': 'Reunião deletada'})