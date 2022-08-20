import api from '@/services/axios';

export default {
    getAll() {
        return api.get('api/shipments');
    },
    get(id) {
        return api.get('api/shipments/' + id);
    },
    store(shipment) {
        return api.post('api/shipments', shipment);
    },
    update(shipment) {
        return api.put('api/shipments/' + shipment.id, shipment);
    },
    delete(id) {
        return api.delete('api/shipments/' + id)
    },
    countByStatus() {
        return api.get('api/shipments/count-by-status')
    }
}