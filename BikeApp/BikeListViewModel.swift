//
//  BikeListViewModel.swift
//  Bike-App
//
//  Created by Munteanu, Cristian on 12.11.2023.
//

import Foundation
import SwiftUI

class BikeListViewModel: ObservableObject {
    @Published var bikes: [Bike] = []
    
    private let baseUrl = "http://localhost:3000/api/bikes"
    
    init() {
        loadBikes()
    }
    
    func loadBikes() {
        guard let url = URL(string: baseUrl) else { return }
        
        URLSession.shared.dataTask(with: url) { [weak self] data, _, error in
            guard let data = data, error == nil else {
                print(error?.localizedDescription ?? "Unknown error")
                return
            }
            
            if let bikes = try? JSONDecoder().decode([Bike].self, from: data) {
                DispatchQueue.main.async {
                    self?.bikes = bikes
                }
            }
        }.resume()
    }
    
    func addBike(bike: Bike) {
        guard let url = URL(string: baseUrl), let encodedBike = try? JSONEncoder().encode(bike) else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = encodedBike
        
        URLSession.shared.dataTask(with: request) { [weak self] _, _, error in
            if let error = error {
                print("Error adding bike: \(error)")
            } else {
                self?.loadBikes()
            }
        }.resume()
    }
    
    func updateBike(bike: Bike) {
        guard let bikeId = bike.id, let url = URL(string: "\(baseUrl)/\(bikeId)"), let encodedBike = try? JSONEncoder().encode(bike) else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = "PUT"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = encodedBike
        
        URLSession.shared.dataTask(with: request) { [weak self] _, _, error in
            if let error = error {
                print("Error updating bike: \(error)")
            } else {
                self?.loadBikes()
            }
        }.resume()
    }
    
    func deleteBike(bikeId: Int) {
        guard let url = URL(string: "\(baseUrl)/\(bikeId)") else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"
        
        URLSession.shared.dataTask(with: request) { [weak self] _, _, error in
            if let error = error {
                print("Error deleting bike: \(error)")
            } else {
                self?.loadBikes()
            }
        }.resume()
    }
    
}
